
// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Schedule from "layouts/schedule";
import UserAI from "layouts/UserAI";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

var routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "User List",
    key: "tables",
    route: "/tables",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
    ),
    component: <Tables />,
  },
  {
    type: "route",
    name: "Schedule",
    key: "billing",
    route: "/schedule",
    icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-calendar-grid-58" />,
    component: <Schedule />,
  },
  {
    type: "route",
    name: "User access list",
    key: "bi",
    route: "/user-access",
    icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-calendar-grid-58" />,
    component: <UserAI />,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <Profile />,
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
    component: <SignUp />,
  }
];

export default routes;
