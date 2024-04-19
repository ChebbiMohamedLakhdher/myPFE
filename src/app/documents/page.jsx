import React, { useState } from "react";
import axios from "axios";
import "./Documents.scss";

function Documents() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [resume, setResume] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [deps, setDeps] = useState([]);
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [title, setTitle] = useState("");
    const [name_loc, setNameLocation] = useState("");
    const [location, setLocation] = useState("");
    const [formateur, setFormateur] = useState("");
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDepChange = (e) => {
        const { value, checked } = e.target;
        if (value === "all") {
            // If "All" is clicked, update all department checkboxes accordingly
            const updatedDeps = checked ? ["1", "2", "3", "4", "5", "6", "7"] : [];
            setDeps(updatedDeps);
        } else {
            // If a specific department is clicked, update the state accordingly
            let updatedDeps;
            if (checked) {
                updatedDeps = [...deps, value];
            } else {
                updatedDeps = deps.filter((dep) => dep !== value);
            }
            setDeps(updatedDeps);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            title,
            lastName,
            email,
            contact,
            selectedOption,
            resume,
            date,
            time,
            type,
            deps,
            name_loc,
            location,
            formateur
        );
        // Add your form submission logic here
    };

    const handleReset = () => {
        // Reset all state variables here
        setTitle("");
        setLastName("");
        setEmail("");
        setContact("");
        setTime("");
        setDate("");
        setResume("");
        setSelectedOption("");
        setDeps([]);
        setType("");
        setFormateur("");
        setNameLocation("");
        setLocation("");
    };

    return (
        <div className="Documents">
            <h1>Form Documents</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title*</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    required
                />
                <label htmlFor="dep">Targeted Departments*</label>
                <div className="department-selection">
                    <button className="department-toggle" onClick={toggleModal}>
                        Select Departments
                    </button>
                    {showModal && (
                        <div className="modal-overlay" onClick={toggleModal}>
                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Select Departments</h2>
                                    <span className="close" onClick={toggleModal}>&times;</span>
                                </div>
                                <div className="modal-content">
                                    <ul>
                                    <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="all"
                                                    checked={deps.length === 7}
                                                    onChange={handleDepChange}
                                                />
                                               All
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="1"
                                                    checked={deps.includes("1")}
                                                    onChange={handleDepChange}
                                                />
                                                Development
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="2"
                                                    checked={deps.includes("2")}
                                                    onChange={handleDepChange}
                                                />
                                                Design
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="3"
                                                    checked={deps.includes("3")}
                                                    onChange={handleDepChange}
                                                />
                                                Project management
                                            </label>
                                        </li>  <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="4"
                                                    checked={deps.includes("4")}
                                                    onChange={handleDepChange}
                                                />
                                               Content
                                            </label>
                                        </li>  <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="5"
                                                    checked={deps.includes("5")}
                                                    onChange={handleDepChange}
                                                />
                                                Sales & Marketing
                                            </label>
                                        </li>  <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="6"
                                                    checked={deps.includes("6")}
                                                    onChange={handleDepChange}
                                                />
                                                Customer Support
                                            </label>
                                        </li>
                                            
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <label htmlFor="file">Upload Document*</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setResume(e.target.files[0])}
                    placeholder="Enter Upload File"
                    required
                />
                <button type="reset" id="butt2" value="reset" onClick={handleReset}>Reset</button>
                <button type="submit" id="bu" value="Submit">Submit</button>
            </form>
        </div>
    );
}

export default Documents;
