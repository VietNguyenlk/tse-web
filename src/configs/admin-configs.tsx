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
  },
  {
    id: "activities",
    title: "Hoạt động",
    icon: <Hub />,
    link: "/admin/activities",
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
    des: "Thiết lập thành viên",
    icon: <Person />,
  },
  {
    id: "roles",
    title: "Vai trò & Quyền",
    des: "Thiết lập vai trò và quyền",
    icon: <LockPerson />,
  },
  {
    id: "register-requests",
    title: "Duyệt đăng ký",
    des: "Các đơn đăng ký mới",
    icon: <PersonAdd />,
  },
  {
    id: "exit-requests",
    title: "Yêu cầu rời CLB",
    des: "Thành viên rời CLB",
    icon: <DirectionsWalk />,
  },
];
