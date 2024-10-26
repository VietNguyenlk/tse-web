import { DirectionsWalk, LockPerson, Person, PersonAdd } from "@mui/icons-material";
import React from "react";

export type AdminHeaderItem = {
  id: string;
  title: string;
  des: string;
  icon: React.ReactNode;
};

export const adminHeaderItems: AdminHeaderItem[] = [
  {
    id: "members",
    title: "Members",
    des: "Setup members",
    icon: <Person />,
  },
  {
    id: "roles",
    title: "Roles",
    des: "Roles & Privileges",
    icon: <LockPerson />,
  },
  {
    id: "register-requests",
    title: "Register Requests",
    des: "Approve register requests",
    icon: <PersonAdd />,
  },
  {
    id: "exit-requests",
    title: "Exit Requests",
    des: "Exit requests",
    icon: <DirectionsWalk />,
  },
];
