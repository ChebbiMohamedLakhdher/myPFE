"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./pro.scss";

const Pro = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve token from cookies
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
    
        <div className="top">
          <div className="left">
            {user && (
              <>
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{user.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{user.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{user.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{user.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Position:</span>
                      <span className="itemValue">{user.position}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {error && <div>Error: {error}</div>}
          </div>
          <div className="right"></div>
        </div>
      
  );
};

export default Pro;
