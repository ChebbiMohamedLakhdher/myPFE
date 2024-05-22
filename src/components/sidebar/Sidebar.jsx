"use client";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";

const Sidebar = ({ backgroundColor, setBackgroundColor }) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
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
                <span> Admin Dashboard </span>
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
              </Link>
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
          

          
          <p className="title">Service</p>
          <li>
            <button>
              <Link href="/remunaration">
                <LocalAtmIcon className="icon" />
                <span> Remuneration </span>
              </Link>
            </button>
          </li>
          
          <p className="title">User</p>
          <li>
            <button>
              <Link href="/profileadmin">
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
