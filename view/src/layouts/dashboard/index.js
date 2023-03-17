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

import { getHumidityData, getTemperatureData, getLuminanceData } from "model/api/api";



function Default() {
  const [hData, setHData] = useState(null);
  const [tData, setTData] = useState(null);
  const [lData, setLData] = useState(null);
  var today = new Date();

  useEffect(()=>{
    getHumidityData()
    .then((res)=>{
      console.log(res);
      let resLabel = res.map((e)=>e[1].substring(0, 2));
      let resValue = res.map((e)=>e[0]);
      setHData({
        labels: resLabel,
        datasets: [
          {
            label: "Humidity",
            color: "info",
            data: resValue,
          },
        ],
      });
    })
    .catch((err)=>{
      console.log(err);
    });
    getTemperatureData()
    .then((res)=>{
      console.log(res);
      let resLabel = res.map((e)=>e[1].substring(0, 2));
      let resValue = res.map((e)=>e[0]);
      setTData({
        labels: resLabel,
        datasets: [
          {
            label: "Temperature",
            color: "info",
            data: resValue,
          },
        ],
      });
    })
    .catch((err)=>{
      console.log(err);
    });
    getLuminanceData()
    .then((res)=>{
      console.log(res);
      let resLabel = res.map((e)=>e[1].substring(0, 2));
      let resValue = res.map((e)=>e[0]);
      setLData({
        labels: resLabel,
        datasets: [
          {
            label: "Luminance",
            color: "info",
            data: resValue,
          },
        ],
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }, []);

  if (tData != null && hData != null && lData != null)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Recent temperature"
              count={tData.datasets[0].data.length > 0 ?`${tData.datasets[0].data[tData.datasets[0].data.length - 1]} \u2103`: ''}
              icon={{ color: "info", component: <i className='fa fa-thermometer'/> }}
              percentage={{ color: `${tData.datasets[0].data[tData.datasets[0].data.length - 1] - tData.datasets[0].data[tData.datasets[0].data.length - 2] > 0 ? "success":"error"}`, count:`${tData.datasets[0].data[tData.datasets[0].data.length - 1] - tData.datasets[0].data[tData.datasets[0].data.length - 2] > 0 ? '+':''}${tData.datasets[0].data[tData.datasets[0].data.length - 1] - tData.datasets[0].data[tData.datasets[0].data.length - 2]} \u2103`, text: "since one hour" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Recent humidity"
              count={hData.datasets[0].data.length > 0 ?`${hData.datasets[0].data[hData.datasets[0].data.length - 1]} %`: ''}
              icon={{ color: "error", component: <i className="fa fa-tint" /> }}
              percentage={{ color: `${hData.datasets[0].data[hData.datasets[0].data.length - 1] - hData.datasets[0].data[hData.datasets[0].data.length - 2] > 0 ? "success":"error"}`, count:`${hData.datasets[0].data[hData.datasets[0].data.length - 1] - hData.datasets[0].data[hData.datasets[0].data.length - 2] > 0 ? '+':''}${hData.datasets[0].data[hData.datasets[0].data.length - 1] - hData.datasets[0].data[hData.datasets[0].data.length - 2]} %`, text: "since one hour" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Recent luminance"
              count={lData.datasets[0].data.length > 0 ?`${lData.datasets[0].data[lData.datasets[0].data.length - 1]} nits`: ''}
              icon={{ color: "success", component: <i className="fa fa-lightbulb-o" /> }}
              percentage={{ color: `${lData.datasets[0].data[lData.datasets[0].data.length - 1] - lData.datasets[0].data[lData.datasets[0].data.length - 2] > 0 ? "success":"error"}`, count:`${lData.datasets[0].data[lData.datasets[0].data.length - 1] - lData.datasets[0].data[lData.datasets[0].data.length - 2] > 0 ? '+':''}${lData.datasets[0].data[lData.datasets[0].data.length - 1] - lData.datasets[0].data[lData.datasets[0].data.length - 2]} nits`, text: "since one hour" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Today"
              count={String(today.getDate()).padStart(2, '0')}
              icon={{ color: "success", component: <i className="fa fa-calendar" /> }}
              percentage={{color: "success",count: String(today.getMonth() + 1).padStart(2, '0') + "/" + today.getFullYear() }}
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
              title="Brightness Overview"
              chart={lData}
            />
          </Grid>
        </Grid>

      </ArgonBox>
      {/*<Footer />*/}
    </DashboardLayout>
    
  );
}

export default Default;
