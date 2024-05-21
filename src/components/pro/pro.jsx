"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./pro.scss";
import Link from "next/link";

const Pro = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log({ token, userId });
        if (!token) {
          setError("Token not found");
          return;
        }

        const response = await axios.post(
          "/api/users/prof",
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Success", response.data);
        setUser(response.data.user);
        toast.success("User information loaded successfully");
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="one">
      <div className="two">
        {user ? (
          <>
            
            
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="Profile"
                className="itemImg1"
              />
              <div className="details1">
                <h1 className="itemTitle1">{user.name}</h1>
                <div className="detailItem1">
                  <label className="lol">Email: </label>
                  <span className="itemValue1">{user.email}</span>
                </div>
                <div className="detailItem1">
                  <span className="itemValue1">{user.position}</span>
                </div>
                
              </div>
              
            </div>
            <div className="editButton1">
              <Link href="/employee/profile">
                <span>Edit</span>
            </Link></div>
          </>
        ) : (
          <div className="error1">Error: {error}</div>
        )}
      </div>
      <div className="right1"></div>
    </div>
  );
};

export default Pro;
