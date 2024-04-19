"use client"
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./news.scss";
import NewsCard from "../card/card"; // Corrected component name
import Reunion from "../reunion/page"; // Corrected component name
import Documents from "../documents/page"; // Corrected component name
import Seminaire from "../seminaire/page"; // Corrected component name
import Formation from "../formation/page"; // Corrected component name

export default function News() { // Capitalized component name
  return (
    <div>
      <div className="news">
        <Sidebar />
        <div className="adminContainer">
          <Navbar />
          <div>
          <NewsCard />
            
          </div>
        </div>
      </div>
    </div>
  );
}
