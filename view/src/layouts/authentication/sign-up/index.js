// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { postSignUp } from "model/api/api";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  function handleSignUp()
  {
    var data = {
      "name": document.getElementById("name").value,
      "email": document.getElementById("email").value,
      "phone": document.getElementById("phone").value,
      "location": document.getElementById("location").value,
      "dob": document.getElementById("dob").value,
      "image": document.getElementById("image").value,
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value,
    }
    postSignUp(data)
    .then((res)=>{
      if (res["message"] == false) {
        alert("Username already exists!")
        return;
      }
      window.location.pathname = "/authentication/sign-in";
    })
    .catch((err)=>console.log(err))
    
    
  }
  return (
    <CoverLayout
      title="Welcome!"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput id="name" placeholder="Name" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="email" type="email" placeholder="Email" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="phone" placeholder="Phone Number" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="location" placeholder="Location" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="dob" type="date" placeholder="Day of birth" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="image" placeholder="Link Image" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="username" placeholder="Username" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput id="password" type="password" placeholder="Password" />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
                color="warning"
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="primary" fullWidth onClick={handleSignUp}>
                Sign up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="primary"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
