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
    text: "all businesses",
    path: "all-events",
    icon: <MdQueryStats />,
    role: "all",
  },
  { text: "stats", path: "stats", icon: <IoBarChartSharp />, role: "user" },
  { text: "profile", path: "profile", icon: <ImProfile />, role: "user" },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
    role: "admin",
  },
  { text: "chat", path: "chat", icon: <IoChatbubblesOutline />, role: "user" },
];

export default links;
