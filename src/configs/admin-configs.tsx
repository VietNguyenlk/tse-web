import React from "react";

import {
  CurrencyExchange,
  DirectionsWalk,
  Groups,
  Home,
  Hub,
  LockPerson,
  Person,
  PersonAdd,
  QuestionAnswerOutlined,
} from "@mui/icons-material";

export type AdminHeaderItem = {
  id: string;
  title: string;
  des: string;
  icon: React.ReactNode;
};

export type SideBarItem = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  link?: string;
  submenu?: {
    id: string;
    title: string;
    link?: string;
  }[];
};

export const adminSideBarItems: SideBarItem[] = [
  {
    id: "dashboard",
    title: "Trang chủ",
    icon: <Home />,
    link: "/admin/dashboard",
  },
  {
    id: "members",
    title: "Thành viên",
    icon: <Person />,
    link: "/admin/members",
    // submenu: [
    //   { id: "all-members", title: "All Members" },
    //   { id: "roles", title: "Roles" },
    //   { id: "profile", title: "Profile" },
    // ],
  },
  {
    id: "activities",
    title: "Hoạt động",
    icon: <Hub />,
    link: "/admin/activities",
  },
  {
    id: "groups",
    title: "Nhóm",
    icon: <Groups />,
    link: "/admin/groups",
  },
  {
    id: "budget",
    title: "Ngân sách",
    icon: <CurrencyExchange />,
    link: "/admin/budget",
  },
  {
    id: "forum",
    title: "Q&A",
    icon: <QuestionAnswerOutlined />,
    link: "/admin/forum",
  },
];

export const adminHeaderItems: AdminHeaderItem[] = [
  {
    id: "members",
    title: "Thành viên",
    des: "Setup members",
    icon: <Person />,
  },
  {
    id: "roles",
    title: "Vai trò & Quyền",
    des: "Roles & Privileges",
    icon: <LockPerson />,
  },
  {
    id: "register-requests",
    title: "Duyệt đăng ký",
    des: "Approve register requests",
    icon: <PersonAdd />,
  },
  {
    id: "exit-requests",
    title: "Yêu cầu rời nhóm",
    des: "Exit requests",
    icon: <DirectionsWalk />,
  },
];
