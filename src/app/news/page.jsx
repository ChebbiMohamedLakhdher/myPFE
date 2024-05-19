"use client"
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./news.scss";
import NewsCard from "../card/card"; // Corrected component name




export default function News() { 
  
  return (
    <div>
      <div className="news">
        <Sidebar />
        <div className="adminContainer">
          <Navbar />
          <div className="card">
            <NewsCard />
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
}
