// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import {Author, Function} from "layouts/tables/data/authorsTableData";
import { useEffect, useState } from "react";
import { getUserListData } from "model/api/api";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { getUserAccess } from "model/api/api";


function Tables() {
  //const { columns, rows } = authorsTableData;
  var columns = [
    { name: "user", align: "left"},
    { name: "position", align: "left"},
    { name: "datetime", align: "center" }
  ];
  const [rows, setRows] = useState(null);
  
  useEffect(()=>{
    getUserAccess()
    .then((res)=>{
      res = res.reverse();
      res = res.slice(0, 10);
      setRows(res.map((idx)=> {
        return {
          user: <Author image={idx.linkref ? "http://localhost:8000/" + idx.linkref : team2} name={idx.name ? idx.name : "Anonymous"} />,
          position: <Function job={idx.position ? idx.position : "Anonymous"} org="" />,
          datetime: (
            <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
              {idx.datetime}
            </ArgonTypography>
          )
        }
      }))
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])
  if (rows)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">User List</ArgonTypography>
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

export default Tables;
