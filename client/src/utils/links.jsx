import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";

const links = [
  { text: "add business", path: ".", icon: <FaWpforms />, role: "business" },
  {
    text: "Event requests",
    path: "event-requests",
    icon: <FaWpforms />,
    role: "all",
  },
  {
    text: "Admin Panel",
    path: "admin-panel",
    icon: <FaWpforms />,
    role: "admin",
  },
  {
    text: "all businesses",
    path: "all-events",
    icon: <MdQueryStats />,
    role: "all",
  },
  { text: "profile", path: "profile", icon: <ImProfile />, role: "user" },
];

export default links;
