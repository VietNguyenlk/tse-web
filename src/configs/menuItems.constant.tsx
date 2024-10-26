import { Home, Person } from "@mui/icons-material";

export type MenuItem = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  submenu?: {
    id: string;
    title: string;
  }[];
};

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home />,
  },
  {
    id: "members",
    title: "Members",
    icon: <Person />,
    // submenu: [
    //   { id: "all-members", title: "All Members" },
    //   { id: "roles", title: "Roles" },
    //   { id: "profile", title: "Profile" },
    // ],
  },
];
