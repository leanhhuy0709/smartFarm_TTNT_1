// @mui material components
import Card from "@mui/material/Card";
import { Button, Grid, Checkbox } from "@mui/material";
import ArgonInput from "components/ArgonInput";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data

import CSS from './index.css';
import Table from "examples/Tables/Table";
import {Author, Function} from "layouts/tables/data/authorsTableData";
import team2 from "assets/images/water.png";
import React, {useState, useEffect} from 'react';
import { getScheduleData } from "model/api/api";
import { getDeviceListData } from "model/api/api";


function MySelect(items)
{
  return (
      <select className="schedule-input" style={{padding: "10px", width: items.width}}>
              {items.option.map((idx)=>(<option key = {idx.dID} value={idx.dID}>{idx.name}</option>))}
        </select>
  );
}

function Schedule() {
  const jobOption = [
    {value: "water_the_tree", label: "Water the tree"},
    {value: "turn_on_the_light", label: "Turn on the light"},
    {value: "open_tarpaulin", label: "Open tarpaulin"}
  ];
  var hourOption = [];
  var minuteOption = [];
  for(var i = 0; i < 24; i++)
    hourOption.push({value: i, label: i.toString() + " h"});
  for(var i = 0; i < 60; i++)
    minuteOption.push({value: i, label: i + " m"});  

  var periodOption = [
    {value: "5 minutes", label: "5 minutes"},
    {value: "15 minutes", label: "15 minutes"},
    {value: "30 minutes", label: "30 minutes"},
    {value: "1 hour", label: "1 hour"},
    {value: "2 hours", label: "2 hours"},
  ];
  var columns = [
    { name: "device", align: "left"},
    { name: "day_of_week", align: "center"},
    { name: "start_time", align: "center"},
    { name: "end_time", align: "center"},
    { name: "action", align: "center"}
  ];

  const [rows, setRows] = useState(null) 
  const [devices, setDevices] = useState(null)
  useEffect(()=>{
    getDeviceListData()
    .then((res)=>{
      console.log(res);
      setDevices(res);
    })
    .catch((err)=>console.log(err));
    /*
    getScheduleData()
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>console.log(err))
    */
    let res = [{"dID": 4000, "dOW": "Monday", "startTime": "15:00", "endTime": "16:00", "name": "Water Pump"},
    {"dID": 4001, "dOW": "Tuesday", "startTime": "13:00", "endTime": "14:00", "name": "Water Pump"},
    {"dID": 4002, "dOW": "Monday", "startTime": "12:00", "endTime": "13:00", "name": "Light"}
  ];
    setRows(res.map((e)=> {
      return {
        device: <Author image={""} name={e.name}/>,
        day_of_week: e.dOW,
        start_time: e.startTime,
        end_time: e.endTime,
        action: <Button className="schedule-button">Delete</Button>
      };
    }))
  }, []);


  function handleAddSchedule()
  {

  }

  if (rows && devices)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
      <Grid container spacing={2} mb={3}>
          <Grid item xs={12} lg={6}>
            <Card>
              <Grid container spacing={3} style={{background: "inherit"}}>
                <Grid item xs={12} style={{background: "inherit"}}>
                  <ArgonTypography variant="h2" style={{textAlign: "center"}}>Function</ArgonTypography>
                </Grid>

                <Grid item xs={2} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Job</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={10} style={{background: "inherit"}}>
                  <MySelect option={devices} width="calc(100% - 30px)"/>
                </Grid>

                <Grid item xs={2} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Date</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={10} style={{background: "inherit"}}>
                  <input className="schedule-input" type="date" style={{padding: "10px", width: "calc(100% - 30px)"}}/>
                </Grid>

                <Grid item xs={2} style={{background: "inherit"}}>
                  <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Time</b></ArgonTypography>
                </Grid>
                <Grid item xs={5} style={{background: "inherit"}}>
                <MySelect option={hourOption} width="calc(100% - 30px)"/>
                </Grid>
                <Grid item xs={5} style={{background: "inherit"}}>
                <MySelect option={minuteOption} width="calc(100% - 30px)"/>
                </Grid>

                <Grid item xs={3} style={{background: "inherit"}}>
                  <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Period</b></ArgonTypography>
                </Grid>
                <Grid item xs={9} style={{background: "inherit"}}>
                <MySelect option={periodOption} width="calc(100% - 30px)"/>
                </Grid>

                <Grid item xs={12} style={{background: "inherit", textAlign: "center", marginBottom: "20px"}}>
                <Button className="schedule-button">Create</Button>
                </Grid>

              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card>
              <Grid container spacing={3} style={{background: "inherit"}}>
                <Grid item xs={12} style={{background: "inherit"}}>
                  <ArgonTypography variant="h2" style={{textAlign: "center"}}>AI System</ArgonTypography>
                </Grid>

                <Grid item xs={10} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Auto water the tree</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={2} style={{background: "inherit"}}>
                  <Checkbox defaultChecked />
                </Grid>

                <Grid item xs={10} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Auto turn on the light</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={2} style={{background: "inherit"}}>
                  <Checkbox defaultChecked />
                </Grid>

                <Grid item xs={10} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Auto open tarpaulin</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={2} style={{background: "inherit"}}>
                  <Checkbox defaultChecked />
                </Grid>

                <Grid item xs={10} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Notify when something unusual happens</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={2} style={{background: "inherit"}}>
                  <Checkbox defaultChecked />
                </Grid>



                <Grid item xs={12} style={{background: "inherit", textAlign: "center", marginBottom: "20px"}}>
                <Button className="schedule-button">Confirm</Button>
                </Grid>

              </Grid>
            </Card>
          </Grid>
      </Grid>
      </ArgonBox>


      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Schedule</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
        
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Schedule;
