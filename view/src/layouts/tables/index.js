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

import {Button} from "@mui/material";

function Tables() {
  //const { columns, rows } = authorsTableData;
    var columns = [
        { name: "user", align: "left"},
        { name: "position", align: "left"},
        { name: "phone", align: "center"},
        { name: "dob", align: "center"},
        { name: "location", align: "center"},
    ];
    const [rows, setRows] = useState(null);
  
    useEffect(()=>{
        getUserListData()
        .then((res)=>{
        console.log(res);
        setRows(res.map((idx)=> {
            return {
            user: <Author image={idx.image ? "http://localhost:8000/" + idx.image : team2} name={idx.name} email={idx.email} />,
            position: <Function job={idx.position} org="" />,
            phone: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                {idx.phone}
                </ArgonTypography>
            ),
            dob: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                {idx.dob.toString().substring(5, 16)}
                </ArgonTypography>
            ),
            location: (
                <ArgonTypography
                component="a"
                href="#"
                variant="caption"
                color="secondary"
                fontWeight="medium"
                >
                {idx.location}
                </ArgonTypography>
            ),
            }
        }))
        })
        .catch((err)=>{
        console.log(err);
        })
    }, []);

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
