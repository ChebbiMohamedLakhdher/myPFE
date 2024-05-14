"use client"
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Prof from "../../app/prof/page";
import "./profileadmin.scss";




export default function Profileadmin() { 
  
  return (
    <div>
      
          <div className="user">

              <Prof />

            </div>
        </div>
      
  );
}