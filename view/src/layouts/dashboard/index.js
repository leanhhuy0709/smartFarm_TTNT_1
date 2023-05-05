import {useState, useEffect} from 'react';

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";
//import mqtt from "mqtt";

import { getHumidityData, getTemperatureData, getLuminanceData } from "model/api/api";
import mqtt from 'mqtt';//
import {Buffer} from 'buffer';

function round2Dec(num)
{
  return Math.round(num * 100)/100
}

function Default() {

    const [client, setClient] = useState(null);
    const [mqttH, setMqttH] = useState(null);
    const [mqttL, setMqttL] = useState(null);
    const [mqttT, setMqttT] = useState(null);
    const topicH = 'leanhhuy/feeds/humidity';
    const topicL = 'leanhhuy/feeds/luminance';
    const topicT = 'leanhhuy/feeds/temperature';

    const [rawHData, setRawHData] = useState(null);
    const [rawTData, setRawTData] = useState(null);
    const [rawLData, setRawLData] = useState(null);

    const [hData, setHData] = useState(null);
    const [tData, setTData] = useState(null);
    const [lData, setLData] = useState(null);
    
    var today = new Date();
    const [day, setDay] = useState(today.getDate());

    const convertToChartData = (name, data, day) =>
    {
        data = data.filter((e)=>Number(e.created_at.substring(8, 10)) == day);
        data = data.reverse();
        let resLabel = data.map((e, idx)=>idx);
        let resValue = data.map((e)=>e.value);
        return {
        labels: resLabel,
        datasets: [
            {
            label: name,
            color: "info",
            data: resValue,
            },
        ],
        }
    }

    useEffect(()=>{
        getHumidityData()
        .then((res)=>{
        setRawHData(res);
        setHData(convertToChartData("Humidity", res, day));
        })
        .catch((err)=>{
        console.log(err);
        });
        getTemperatureData()
        .then((res)=>{
        setRawTData(res);
        setTData(convertToChartData("Temperature", res, day));
        })
        .catch((err)=>{
        console.log(err);
        });
        getLuminanceData()
        .then((res)=>{
        setRawLData(res);
        setLData(convertToChartData("Luminance", res, day));
        })
        .catch((err)=>{
        console.log(err);
        });
    }, [mqttH, mqttL, mqttT]);

    useEffect(() => {
        // Kết nối MQTT client đến Adafruit IO
        const options = {
          protocol: 'mqtts',
          username: 'leanhhuy',
          password: 'aio_Gsda08OV8x6IQ6LLSMTrwSN2mUgc'
        };
        const newClient = mqtt.connect('mqtts://io.adafruit.com', options);
    
        newClient.subscribe(topicH);
        newClient.subscribe(topicL);
        newClient.subscribe(topicT);

        newClient.on('message', (topic, message) => {
            console.log(`Received message from ${topic}: ${message.toString()}`);
            switch(topic)
            {
                case topicH:
                    setMqttH(Number(message));
                    break;
                case topicL:
                    setMqttL(Number(message));
                    break;
                case topicT:
                    setMqttT(Number(message));
                    break;
            }
        });
        // Lưu client vào state
        setClient(newClient);
    
        // Hủy kết nối khi component unmount
        return () => {
            newClient.end();
        };
    }, []);

    function handleDayChange()
    {
        let selectedDay = document.getElementById("select-day").value;
        
        setHData(convertToChartData("Humidity", rawHData, selectedDay));
        setTData(convertToChartData("Temperature", rawTData, selectedDay));
        setLData(convertToChartData("Luminance", rawLData, selectedDay));
    }

    function SelectDate()
    {
        return (
        <select id = "select-day" style={{fontSize: "18px", padding: "5px"}} onChange = {handleDayChange}>
            <option value = {today.getDate()}>{today.getDate()}</option>
            <option value = {today.getDate() - 1}>{today.getDate() - 1}</option>
            <option value = {today.getDate() - 2}>{today.getDate() - 2}</option>
            <option value = {today.getDate() - 3}>{today.getDate() - 3}</option>
            
        </select>
        );


    }
    if (tData != null && hData != null && lData != null)
    return (
        <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={3}>

            <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6} lg={3}>
                <DetailedStatisticsCard
                title="Recent temperature"
                count={mqttT ? `${mqttT} \u2103` : (tData.datasets[0].data.length > 0 ?`${round2Dec(tData.datasets[0].data[tData.datasets[0].data.length - 1])} \u2103`: '')}
                icon={{ color: "info", component: <i className='fa fa-thermometer'/> }}
                percentage={{ color: `${tData.datasets[0].data[tData.datasets[0].data.length - 1] - tData.datasets[0].data[tData.datasets[0].data.length - 2] >= 0 ? "success":"error"}`, count:`${tData.datasets[0].data[tData.datasets[0].data.length - 1] - tData.datasets[0].data[tData.datasets[0].data.length - 2] > 0 ? '+':''}${round2Dec(tData.datasets[0].data[tData.datasets[0].data.length - 1] - tData.datasets[0].data[tData.datasets[0].data.length - 2])} \u2103`, text: "since one hour" }}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <DetailedStatisticsCard
                title="Recent humidity"
                count={mqttH ? `${mqttH} %` : (hData.datasets[0].data.length > 0 ?`${round2Dec(hData.datasets[0].data[hData.datasets[0].data.length - 1])} %`: '')}
                icon={{ color: "error", component: <i className="fa fa-tint" /> }}
                percentage={{ color: `${hData.datasets[0].data[hData.datasets[0].data.length - 1] - hData.datasets[0].data[hData.datasets[0].data.length - 2] >= 0 ? "success":"error"}`, count:`${hData.datasets[0].data[hData.datasets[0].data.length - 1] - hData.datasets[0].data[hData.datasets[0].data.length - 2] > 0 ? '+':''}${round2Dec(hData.datasets[0].data[hData.datasets[0].data.length - 1] - hData.datasets[0].data[hData.datasets[0].data.length - 2])} %`, text: "since one hour" }}
                />
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
                <DetailedStatisticsCard
                title="Recent luminance"
                count={mqttL ? `${mqttL} nm` : (lData.datasets[0].data.length > 0 ?`${round2Dec(lData.datasets[0].data[lData.datasets[0].data.length - 1])} nm`: '')}
                icon={{ color: "success", component: <i className="fa fa-lightbulb-o" /> }}
                percentage={{ color: `${lData.datasets[0].data[lData.datasets[0].data.length - 1] - lData.datasets[0].data[lData.datasets[0].data.length - 2] >= 0 ? "success":"error"}`, count:`${lData.datasets[0].data[lData.datasets[0].data.length - 1] - lData.datasets[0].data[lData.datasets[0].data.length - 2] > 0 ? '+':''}${round2Dec(lData.datasets[0].data[lData.datasets[0].data.length - 1] - lData.datasets[0].data[lData.datasets[0].data.length - 2])} nm`, text: "since one hour" }}
                />
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
                <DetailedStatisticsCard
                title="Today"
                count={  SelectDate()
                /*SelectDate()*/}
                icon={{ color: "success", component: <i className="fa fa-calendar" /> }}
                percentage={{color: "success",count: String(today.getMonth() + 1).padStart(2, '0') + "/" + today.getFullYear(),text: ""}}
                />
            </Grid>
            </Grid>


            <Grid container spacing={3} mb={3}>
            <Grid item xs={12} lg={7}>
                <GradientLineChart
                title="Temperature Overview"
                chart={tData}
                />
            </Grid>
            <Grid item xs={12} lg={5}>
                <Slider />
            </Grid>
            </Grid>

            <Grid container spacing={3} mb={3}>
            <Grid item xs={12} lg={6}>
                <GradientLineChart
                title="Humidity Overview"
                chart={hData}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <GradientLineChart
                title="Luminance Overview"
                chart={lData}
                />
            </Grid>
            </Grid>

        </ArgonBox>
        </DashboardLayout>
        
    );
}

export default Default;
