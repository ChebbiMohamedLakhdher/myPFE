import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Paper from "@mui/material/Paper";
import "./off_table.scss";


const Off_table = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.post("/api/users/off_table");
            console.log("Success", response.data);
            setOffers(response.data); // Set users data in state
            toast.success("Offers imported successfully");
        } catch (error) {
            console.log("Failed", error.response?.data?.error || "Unknown error");
            setError(error.response?.data?.error || "Unknown error");
        }
    };

    fetchUsers();
}, []);
  return (
    <div className="container">
    <h2>Post</h2>
    <div className="blog-post">
      <div className="blog-post_img">
        <img
          src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU3fHx0ZWNobm9sb2d5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className="blog-post_info">
        <div className="blog-post_date">
          <span>Sagar Developer</span>
          <span>Nov 12 2021</span>
        </div>
        <h1 className="blog-post_title">Lorem ipsum dolor sit amet.</h1>
        <p className="blog-post_text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores a,
          tempore veniam quasi sint fugiat facilis, facere, amet magnam optio
          velit. Laudantium et temporibus soluta, esse cupiditate aliquid dicta
          accusantium.
        </p>
        <a href="#" className="blog-post_cta">
          Read More
        </a>
      </div>
    </div>
    <div className="blog-post">
      <div className="blog-post_img">
        <img
          src="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className="blog-post_info">
        <div className="blog-post_date">
          <span>Sagar Developer</span>
          <span>Dec 25 2021</span>
        </div>
        <h1 className="blog-post_title">Lorem ipsum dolor sit amet.</h1>
        <p className="blog-post_text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores a,
          tempore veniam quasi sint fugiat facilis, facere, amet magnam optio
          velit. Laudantium et temporibus soluta, esse cupiditate aliquid dicta
          accusantium.
        </p>
        <a href="#" className="blog-post_cta">
          Read More
        </a>
      </div>
    </div>
  </div>
    
  )
}

export default Off_table;