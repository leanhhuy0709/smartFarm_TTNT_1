// @mui material components
import Card from "@mui/material/Card";
import { Button, Grid, Checkbox } from "@mui/material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data

import CSS from './index.css';
import Table from "examples/Tables/Table";
import {Author} from "layouts/tables/data/authorsTableData";
import React, {useState, useEffect} from 'react';
import { getScheduleData } from "model/api/api";
import { getDeviceListData } from "model/api/api";
import { putAddSchedule } from "model/api/api";
import { putDelSchedule } from "model/api/api";
import ArgonAlert from "components/ArgonAlert";

function MySelect(items)
{
  return (
      <select id = {items.id} className="schedule-input" style={{padding: "10px", width: items.width}}>
              {items.option.map((idx)=>(<option key = {idx.dID} value={idx.dID}>{idx.name}</option>))}
        </select>
  );
}

function Schedule() {
  const doWOption = [
    {dID: "Monday", name: "Monday"},
    {dID: "Tuesday", name: "Tuesday"},
    {dID: "Wednesday", name: "Wednesday"},
    {dID: "Thursday", name: "Thursday"},
    {dID: "Friday", name: "Friday"},
    {dID: "Saturday", name: "Saturday"},
    {dID: "Sunday", name: "Sunday"},
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
    getScheduleData()
    .then((res)=>{
      setRows(res.map((e)=> {
        return {
          device: <Author image={""} name={e.name}/>,
          day_of_week: e.dOW,
          start_time: e.startTime,
          end_time: e.endTime,
          action: <Button className="schedule-button" onClick={()=>handleDelete(e.dSID)}>Delete</Button>
        };
      }))
    })
    .catch((err)=>console.log(err))
   /*
    let res = [{"dID": 4000, "dSID": 5000, "dOW": "Monday", "startTime": "15:00", "endTime": "16:00", "name": "Water Pump"},
    {"dID": 4001, "dSID": 5001, "dOW": "Tuesday", "startTime": "13:00", "endTime": "14:00", "name": "Water Pump"},
    {"dID": 4002, "dSID": 5002, "dOW": "Monday", "startTime": "12:00", "endTime": "13:00", "name": "Light"}
  ];*/
    
  }, []);

  
  function handleAddSchedule()
  {
    var dID = document.getElementById("dID").value;
    var dOW = document.getElementById("dOW").value;
    var startTime = document.getElementById("st").value;
    var endTime = document.getElementById("et").value;
    if (/^([0-5][0-9]:[0-5][0-9])$/.test(startTime) && /^([0-5][0-9]:[0-5][0-9])$/.test(endTime));
    else
      alert("Please enter the correct time format (`10:21`)");

    
    putAddSchedule({dID, dOW, startTime, endTime})
    .then((res)=>
    {
      if(res.message)
      {
        alert("Add complete!");
        location.reload();
      }
      else 
        alert("Add failed!");
    })
    .catch((err)=>console.log(err))
  }

  function handleDelete(dSID)
  {
    putDelSchedule({dSID})
    .then((res)=>
    {
      if(res.message)
      {
        alert("Delete complete!");
        location.reload()
      }
      else 
        alert("Delete failed!");
    })
    .catch((err)=>console.log(err))
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
                  <MySelect id="dID" option={devices} width="calc(100% - 30px)"/>
                </Grid>

                <Grid item xs={2} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "5px"}}><b>DOW</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={10} style={{background: "inherit"}}>
                  <MySelect id="dOW" option={doWOption} width="calc(100% - 30px)"/>
                </Grid>

                <Grid item xs={2} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>Start</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={10} style={{background: "inherit"}}>
                  <input id="st" style={{width: "calc(100% - 30px)", padding: "10px"}}/>
                </Grid>

                <Grid item xs={2} style={{background: "inherit"}}>
                    <ArgonTypography style={{fontSize: "16px", padding: "10px"}}><b>End</b></ArgonTypography>
                  </Grid>
                  <Grid item xs={10} style={{background: "inherit"}}>
                  <input id="et" style={{width: "calc(100% - 30px)", padding: "10px"}}/>
                </Grid>

                <Grid item xs={12} style={{background: "inherit", textAlign: "center", marginBottom: "20px"}}>
                <Button className="schedule-button" onClick={handleAddSchedule}>Create</Button>
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
