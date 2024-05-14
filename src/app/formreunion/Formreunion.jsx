"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formreunion.scss";

function FormReunion() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [FormR, setFormR] = useState({
        title: "",
        persons: [], // Initialize as an empty array
        date: "",
        time: "",
        uploadDocument: "",
        place: "",
        orderdujour: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post("/api/users/employees");
                console.log("Success", response.data);
                setUsers(response.data); // Set users data in state
                toast.success("Users imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        fetchUsers();
    }, []);""

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEmployeeSelection = (employeeName) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter((name) => name !== employeeName));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
        }
    };
    
    const resetCheckboxes = () => {
        // Reset the deps state to an empty array or any initial state you want
        setSelectedEmployees([]);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', FormR.title);
        formData.append('persons', JSON.stringify(selectedEmployees));
        formData.append('date', FormR.date);
        formData.append('time', FormR.time);
        formData.append('place', FormR.place);
        formData.append('ordredujour', FormR.ordredujour);
    
        // Convertir le fichier en blob
        const file = FormR.uploadDocument;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async function () {
            const arrayBuffer = reader.result;
            const blob = new Blob([arrayBuffer]);
            formData.append('uploadDocument', blob, file.name);
    
            // Envoyer les données au serveur
            try {
                const response = await axios.post("/api/users/forms", formData);
                console.log("Form submission successful", response.data);
            } catch (error) {
                console.error("Form submission failed", error.message);
                setError(true);
            }
        };
    };

    const handleReset = () => {
        // Reset all state variables here
        setFormR({
            title: "",
            persons: [], // Reset persons to an empty array
            date: "",
            time: "",
            uploadDocument: "",
            place: "",
            orderdujour: ""
        });
        setSelectedEmployees([]);
    };

    return (
        <div className="formreunion">
            <h1>Form Reunion</h1>
            <fieldset>
                <form onSubmit={handleForm}>
                    <label htmlFor="title">Title*</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={FormR.title}
                        onChange={(e) => setFormR({ ...FormR, title: e.target.value })}
                        placeholder="Enter Title"
                        required
                    />
                    <label htmlFor="lastname">Persons*</label>
                    <button type="button" id="butt1" onClick={toggleModal}>
                        Select Employees
                    </button>
                    <label htmlFor="date">Date*</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={FormR.date}
                        onChange={(e) => setFormR({ ...FormR, date: e.target.value })}
                        required
                    />
                    <label htmlFor="time">Time*</label>
                    <input
                        type="time"
                        name="time"
                        id="time"
                        value={FormR.time}
                        onChange={(e) => setFormR({ ...FormR, time: e.target.value })}
                        required
                    />
                    <label htmlFor="file">Upload Document</label>
                    <input
                        type="file"
                        name="uploadDocument"
                        id="uploadDocument"
                        onChange={(e) => setFormR({ ...FormR, uploadDocument: e.target.files[0] })}
                        placeholder="Enter Upload File"
                    />
                    <label htmlFor="select">Place*</label>
                    <select
                        name="select"
                        id="select"
                        value={FormR.place}
                        onChange={(e) => setFormR({ ...FormR, place: e.target.value })}
                        required
                    >
                        <option value="" disabled>
                            Select your place
                        </option>
                        <option value="Office">Office</option>
                        <option value="Online">Online</option>
                    </select>
                    <label htmlFor="about">Ordre du jour</label>
                    <textarea
                        name="ordedujour"
                        id="ordedujour"
                        cols="30"
                        rows="10"
                        onChange={(e) => setFormR({ ...FormR, orderdujour: e.target.value })}
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

            {showModal && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Select Employees</h2>
                            <span className="close" onClick={() => {toggleModal(); resetCheckboxes();}}>&times;</span>
                            {/* X button to close modal */}
                        </div>
                        <div className="modal-content">
                            <ul>
                                {users.map((user, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedEmployees.includes(user.name)} // Use _id field
                                                onChange={() => handleEmployeeSelection(user.name)} // Pass _id
                                            />
                                            {user.name}
                                        </label>
                                    </li>

                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                <button onClick={() => {toggleModal()}}>OK</button>
            </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormReunion;
