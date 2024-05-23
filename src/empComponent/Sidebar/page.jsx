"use client";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";

const Sidebar = () => {
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState("whitesmoke");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleColorOptionClick = (color) => {
    setBackgroundColor(color);
  };

    return (
      <div className="sidebar" style={{ backgroundColor }}>
        <div className="top">
          <span className="logo">Lezarts Digital</span>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">Main</p>
            <li>
              <button>
                <Link href="/admin">
                  <DashboardIcon className="icon" />
                  <span> Employee Dashboard </span>
                </Link>
              </button>
            </li>
            <p className="title">Requests</p>
            
            <li>
              <button>
                <Link href="/employee/conge">
                  <EventIcon className="icon" />
                  <span> Day offs </span>
                </Link>
              </button>
            </li>
            <p className="title">Information</p>
            <li>
              <button>
                <Link href="/employee/news">
                  <NewspaperIcon className="icon" />
                  <span> News And Updates </span>
                </Link>
              </button>
            </li>

            <p className="title">Financial</p>
            
            <li>
              <button>
                <Link href="/employee/remun">
                  <LocalAtmIcon className="icon" />
                  <span> Remuneration </span>
                </Link>
              </button>
            </li>
            

            <p className="title">User</p>
            <li>
              <button>
                <Link href="/employee/profile">
                  <SettingsIcon className="icon" />
                  <span> Settings </span>
                </Link>
              </button>
            </li>
            <li>
              <button onClick={logout}>
                <LogoutIcon className="icon" />
                <span> Logout </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => handleColorOptionClick("whitesmoke")}
          ></div>
          <div
            className="colorOption"
            onClick={() => handleColorOptionClick("#333")}
          ></div>
        </div>
      </div>
    );
  };

export default Sidebar;
