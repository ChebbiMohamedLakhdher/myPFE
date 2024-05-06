"use client";
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
import EqualizerIcon from "@mui/icons-material/Equalizer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

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

  return (
    <div className="sidebar">
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
            <EqualizerIcon className="icon" />
            <span> Stats </span>
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
            <AccountCircleIcon className="icon" />
            <span> Profile </span>
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
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
