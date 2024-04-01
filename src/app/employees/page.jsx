"use client";
import "./employees.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function Employees() {


    return (
        <div className="Employees">
            <Sidebar />
            <div className="adminContainer">
                <Navbar />
                <div className="user">

                    <Table />
                    
                </div>
            </div>
        </div>
    );
}
