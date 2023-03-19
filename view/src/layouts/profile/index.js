

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

import {useState, useEffect} from 'react';
import { getUserData } from "model/api/api";

function Overview() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    getUserData()
    .then((res)=>{
      console.log(res);
      setData(res);
    })
    .catch((err)=>console.log(err));

  }, [])

  if (data)
    return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header data = {data} />
      <ArgonBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={12}>
            <ProfileInfoCard
              title="profile information"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel scelerisque est. Donec vitae nisl eu est congue varius. Nunc vestibulum erat felis, id hendrerit risus molestie eu."
              info={{
                fullName: data.name,
                mobile: data.phone,
                email: data.email,
                location: data.location,
              }}
              social={[
                {
                  link: "https://www.facebook.com",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      </ArgonBox>
      
    </DashboardLayout>
  );
}

export default Overview;
