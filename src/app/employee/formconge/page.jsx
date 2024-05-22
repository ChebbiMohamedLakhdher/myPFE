"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./formconge.scss";

function FormConge() {
  const [leaveType, setLeaveType] = useState("normal");
  const [FormC, setFormC] = useState({
    title: "",
    type: "",
    employeeid: "",
    startdate: "",
    enddate: "",
    uploadDocument: "",
    description: "",
  });
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setToken(userId);
    }
  }, []);

  useEffect(() => {
    setFormC((prevFormC) => ({ ...prevFormC, type: leaveType }));
  }, [leaveType]);

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", FormC.title);
    formData.append("type", FormC.type);    
    formData.append("startdate", FormC.startdate);
    formData.append("enddate", FormC.enddate);
    formData.append("description", FormC.description);
    formData.append("employeeid", token);

    if (leaveType === "medical") {
      const file = FormC.uploadDocument;
      formData.append("uploadDocument", file);
    }
    try {
      const response = await axios.post("/api/users/conge", formData);
      console.log("Form submission successful", response.data);
    } catch (error) {
      console.error("Form submission failed", error.message);
      setError(true);
    }
  };

  const handleReset = () => {
    setFormC({
      title: "",
      type: "",
      employeeid: token,
      startdate: "",
      enddate: "",
      uploadDocument: "",
      description: "",
    });
  };

  return (
    <div className="formconge">
      <h1>Request Day Off</h1>
      <fieldset>
        <form onSubmit={handleForm}>
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="normal">Normal Leave</option>
            <option value="medical">Medical Leave</option>
          </select>

          <label htmlFor="title">Title*</label>
          <input
            type="text"
            name="title"
            id="title"
            value={FormC.title}
            onChange={(e) => setFormC({ ...FormC, title: e.target.value })}
            placeholder="Enter Title"
            required
          />

          <label htmlFor="startdate">Start Date*</label>
          <input
            type="date"
            name="startdate"
            id="startdate"
            value={FormC.startdate}
            onChange={(e) => setFormC({ ...FormC, startdate: e.target.value })}
            required
          />

          <label htmlFor="enddate">End Date*</label>
          <input
            type="date"
            name="enddate"
            id="enddate"
            value={FormC.enddate}
            onChange={(e) => setFormC({ ...FormC, enddate: e.target.value })}
            required
          />

          {leaveType === "medical" && (
            <>
              <label htmlFor="uploadDocument">Upload Document</label>
              <input
                type="file"
                name="uploadDocument"
                id="uploadDocument"
                onChange={(e) =>
                  setFormC({ ...FormC, uploadDocument: e.target.files[0] })
                }
                required
              />
            </>
          )}

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={FormC.description}
            onChange={(e) =>
              setFormC({ ...FormC, description: e.target.value })
            }
            placeholder="Description"
            required
          ></textarea>

          <button type="reset" id="butt2" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" id="bu" value="Submit">
            Submit
          </button>
        </form>
      </fieldset>
      {error && (
        <p className="error">Form submission failed. Please try again.</p>
      )}
    </div>
  );
}

export default FormConge;
