"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./profile.scss";
import Sidebar from "../../../empComponent/Sidebar/page";
import Navbar from "../../../components/navbar/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    position: ""
  });

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
          "/api/users/empprofile",
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

  const toggleModal = () => {
    setShowModal(!showModal);
    if (user && !showModal) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        position: user.position || ""
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        return;
      }

      const response = await axios.put(
        "/api/users/updateprofile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
      toast.success("User information updated successfully");
      setShowModal(false);
    } catch (error) {
      setError(error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className="Single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {user && (
              <>
                <div className="editButton" onClick={toggleModal}>Edit</div>
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
          <div className="right">
            {showModal && (
              <div className="modal-overlay" onClick={toggleModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Edit Information</h2>
                    <span className="close" onClick={toggleModal}>&times;</span>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                      <div className="formGroup">
                        <label>Name:</label>
                        <input
                          type="text"
                          name="name"
                          placeholder={user.name}
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="formGroup">
                        <label>Birthday:</label>
                        <input
                          type="date"
                          name="birthday"
                          
                        />
                      </div>
                      <div className="formGroup">
                        <label>Phone:</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          placeholder={user.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="formGroup">
                        <label>Address:</label>
                        <input
                          type="text"
                          name="address"
                          placeholder={user.adress}
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="formGroup">
                        <label>Position:</label>
                        <input
                          type="text"
                          name="position"
                          placeholder={user.position}
                          value={formData.position}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="formGroup">
                      <label htmlFor="dep">Targeted Department:</label>
                <select
                    name="targeteddepartments"
                    id="dep"
                    
                    required
                >
                    <option value="" disabled>Select Department</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design </option>
                    <option value="Project management">Project management</option>
                    <option value="Content">Content</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Customer Support">Customer Support</option>
                </select>
                </div>
                      <div className="formActions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={toggleModal}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
