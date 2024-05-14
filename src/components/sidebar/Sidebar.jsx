"use client"
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from '@mui/icons-material/Chat';

const Sidebar = () => {
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState("whitesmoke");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
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
                <span> Dashboard </span>
              </Link>
            </button>
          </li>
          <p className="title">Lists</p>
          <li>
            <button>
              <Link href="/employees">
                <PersonIcon className="icon" />
                <span> Employees </span>
              </Link>
            </button>
          </li>
          <li>
            <button>
              <Link href="/offers">
                <CreditCardIcon className="icon" />
                <span> Offers </span>
              </Link >
            </button>
          </li>
          <li>  
            <button>
              <Link href="/news">
                <NewspaperIcon className="icon" />
                <span> News And Updates </span>
              </Link>
            </button>
          </li>
         
          <p className="title">Useful</p>
          <li>  
            <button>
              <Link href="/chatroom">
                <ChatIcon className="icon" />
                <span> ChatRoom</span>
              </Link>
            </button>
          </li>
          
          <li>
            <NotificationsNoneIcon className="icon" />
            <span> Notifications </span>
          </li>
          <p className="title">Service</p>
          <li>
            <LocalHospitalIcon className="icon" />
            <span> System health </span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span> Settings </span>
          </li>
          <p className="title">User</p>
          <li>
          <button>
              <Link href="/profileadmin">
                <AccountCircleIcon className="icon" />
                <span> Profile </span>
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
        <div className="colorOption" onClick={() => handleColorOptionClick("whitesmoke")}></div>
        <div className="colorOption" onClick={() => handleColorOptionClick("#333")}></div>
      </div>
    </div>
  );
};

export default Sidebar;
