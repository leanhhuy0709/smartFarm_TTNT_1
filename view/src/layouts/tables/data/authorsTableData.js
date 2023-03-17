/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export function Author({ image, name, email }) {
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      <ArgonBox mr={2}>
        <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
      </ArgonBox>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="button" fontWeight="medium">
          {name}
        </ArgonTypography>
        <ArgonTypography variant="caption" color="secondary">
          {email}
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

export function Function({ job, org }) {
  return (
    <ArgonBox display="flex" flexDirection="column">
      <ArgonTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </ArgonTypography>
      <ArgonTypography variant="caption" color="secondary">
        {org}
      </ArgonTypography>
    </ArgonBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "user", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      user: <Author image={team2} name="John Michael" email="john@gmail.com" />,
      function: <Function job="Staff" org="" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
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
    },
    {
      user: <Author image={team3} name="Alexa Liras" email="alexa@gmail.com" />,
      function: <Function job="Admin" org="" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
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
    },
    {
      user: <Author image={team4} name="Laurent Perrier" email="laurent@gmail.com" />,
      function: <Function job="Owner" org="" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          19/09/17
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
    },
    {
      user: <Author image={team3} name="Michael Levi" email="michael@gmail.com" />,
      function: <Function job="Staff" org="" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          24/12/08
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
    },
    {
      user: <Author image={team2} name="Richard Gran" email="richard@gmail.com" />,
      function: <Function job="Staff" org="" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          04/10/21
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
    },
    {
      user: <Author image={team4} name="Miriam Eric" email="miriam@gmail.com" />,
      function: <Function job="Staff" org="" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          14/09/20
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
    },
  ],
};

export default authorsTableData;
