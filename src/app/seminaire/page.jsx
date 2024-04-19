"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Seminaire.scss"

function Seminaire() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("male");
    const [users, setUsers] = useState([]);
    const [resume, setResume] = useState("");
    const [url, setUrl] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    const [about, setAbout] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const employees = ["Chebbi Mohamed Lakhdher", "Employee 2", "Employee 3"]; // Replace with your actual employee data
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            contact,
            gender,
            selectedOption,
            subjects,
            resume,
            url,
            about,
            date,
            time,
        );
        // Add your form submission logic here
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEmployeeSelection = (employee) => {
        if (selectedEmployees.includes(employee)) {
            setSelectedEmployees(selectedEmployees.filter((emp) => emp !== employee));
        } else {
            setSelectedEmployees([...selectedEmployees, employee]);
        }
    };

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };

    const handleReset = () => {
        // Reset all state variables here
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setTime("");
        setDate("");
        setResume("");
        setUrl("");
        setSelectedOption("");
        setAbout("");
    };
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
    }, []);

    return (
        <div className="seminaire">
            <h1>Form Seminaire</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname">Title*</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter Title"
                        required
                    />
                    <label htmlFor="lastname">Persons*</label>

                    <button type="button" id="butt1" onClick={toggleModal}>Select Employees</button>
                    <label htmlFor="date">Date*</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    <label htmlFor="time">Time*</label>
                    <input
                        type="time"
                        name="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />

                    <label htmlFor="file">Upload Document*</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) => setResume(e.target.files[0])}
                        placeholder="Enter Upload File"
                        required
                    />
                    <label htmlFor="select">Place</label>
                    <select
                        name="select"
                        id="select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="" disabled>Select your place</option>

                        <option value="1">Office</option>
                        <option value="2">Online</option>

                    </select>
                    <label htmlFor="about">Ordre du jour</label>
                    <textarea
                        name="about"
                        id="about"
                        cols="30"
                        rows="10"
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Description"
                        required
                    ></textarea>
                    <button type="reset" id="butt2" value="reset" onClick={handleReset}>Reset</button>
                    <button type="submit" id="bu" value="Submit">Submit</button>
                </form>
            </fieldset>

            {showModal && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Select Employees</h2>
                            <span className="close" onClick={toggleModal}>&times;</span> {/* X button to close modal */}
                        </div>
                        <div className="modal-content">
                            <ul>
                                {users.map((user, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedEmployees.includes(user)}
                                                onChange={() => handleEmployeeSelection(user)}
                                            />
                                            {user.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
}

export default Seminaire;
