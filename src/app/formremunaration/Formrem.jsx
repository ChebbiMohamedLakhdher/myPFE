"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formrem.scss";

function FormRemunaration() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [FormRe, setFormRe] = useState({
    title: "",
    persons: "",
    uploadDocument: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post("/api/users/employees");
        console.log("Success", response.data);
        setUsers(response.data);
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };

    fetchUsers();
  }, []);

  const handleEmployeeSelection = (employeeName) => {
    setSelectedEmployee(employeeName);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", FormRe.title);
    formData.append("persons", selectedEmployee); // Append selectedEmployee directly

    const file = FormRe.uploadDocument;
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async function () {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer]);
        formData.append("uploadDocument", blob, file.name);

        // Sending data to the server
        try {
          const response = await axios.post(
            "/api/users/remunaration",
            formData
          );
          console.log("Form submission successful", response.data);
        } catch (error) {
          console.error("Form submission failed", error.message);
          setError(true);
        }
      };
    } else {
      // Sending data to the server without file
      try {
        const response = await axios.post("/api/users/remunaration", formData);
        console.log("Form submission successful", response.data);
      } catch (error) {
        console.error("Form submission failed", error.message);
        setError(true);
      }
    }
  };

  const handleTitleChange = (e) => {
    setFormRe({ ...FormRe, title: e.target.value });
    setError(null);
  };

  const handleReset = () => {
    setFormRe({
      title: "",
      persons: "",
      uploadDocument: "",
    });
    setSelectedEmployee("");
  };

  return (
    <div className="formrem">
      <h1>Form Remuneration</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          name="title"
          id="title"
          value={FormRe.title}
          onChange={handleTitleChange}
          placeholder="Enter Title"
          required
        />
        <div>
          <label htmlFor="lastname">Persons*</label>
          <button type="button" id="butt1" onClick={toggleModal}>
            Select Employee
          </button>
          <div />

          {showModal && (
            <div className="modal-overlay" onClick={toggleModal}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Select Employee</h2>
                  <span className="close" onClick={toggleModal}>
                    &times;
                  </span>
                </div>
                <div className="modal-content">
                  <ul>
                    {users.map((user, index) => (
                      <li key={index}>
                        <label>
                          <input
                            type="radio"
                            name="employee"
                            checked={selectedEmployee === user.name}
                            onChange={() => handleEmployeeSelection(user.name)}
                          />
                          {user.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button onClick={toggleModal}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <label htmlFor="uploadDocument">Upload Document*</label>
        <input
          type="file"
          name="uploadDocument"
          id="uploadDocument"
          onChange={(e) =>
            setFormRe({ ...FormRe, uploadDocument: e.target.files[0] })
          }
        />
        <button type="reset" id="butt2" value="reset" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" id="bu" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormRemunaration;
