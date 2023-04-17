// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import mqtt from 'mqtt';

export default function Debug() {
    //create mqtt connection
    //const client = mqtt.connect('abc');
    return (
        <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={3}>
            <p>Debug</p>
            <button>Click me!</button>
        </ArgonBox>
        </DashboardLayout>
    );
}

