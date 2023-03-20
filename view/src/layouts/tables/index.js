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
import authorsTableData from "layouts/tables/data/authorsTableData";
import {Author, Function} from "layouts/tables/data/authorsTableData";
import { useEffect, useState } from "react";
import { getUserListData } from "model/api/api";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";


function Tables() {
  //const { columns, rows } = authorsTableData;
  var columns = [
    { name: "user", align: "left", key2: "user" },
    { name: "function", align: "left", key2: "function" },
    { name: "status", align: "center", key2: "status"},
    { name: "employed", align: "center", key2: "employed" },
    { name: "action", align: "center", key2: "action" },
  ];
  const [rows, setRows] = useState(null);
  
  useEffect(()=>{
    getUserListData()
    .then((res)=>{
      console.log(res[0]);
      setRows(res.map((idx)=> {
        return {
          user: <Author image={team2} name={idx[7]} email={idx[6]} />,
          function: <Function job="Staff" org="" />,
          status: (
            <ArgonBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
          ),
          employed: (
            <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
              15/03/23
            </ArgonTypography>
          ),
          action: (
            <ArgonTypography
              component="a"
              href="#"
              variant="caption"
              color="secondary"
              fontWeight="medium"
            >
              Edit
            </ArgonTypography>
          ),
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
