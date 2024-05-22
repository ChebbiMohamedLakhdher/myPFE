"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  const [backgroundColor, setBackgroundColor] = useState("whitesmoke");

  return (
    <div>
      <Sidebar backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} />
      <Navbar backgroundColor={backgroundColor} />
      {/* Other components can be added here */}
    </div>
  );
};

export default Layout;
