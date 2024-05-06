"use client"
import React, { useState } from "react";
import axios from "axios";
import "./formdocument.scss";

function FormDocuments() {

    const [deps, setDeps] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [FormD, setFormD] = useState({
        title: "",
        targeteddepartments: "",
        uploadDocument: "",
    });

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDepChange = (e) => {
        const { value, checked } = e.target;
        if (value === "all") {
            const updatedDeps = checked ? ["Development", "Design", "Project management", "Content", "Sales & Marketing", "Customer Support"] : [];
            setDeps(updatedDeps);
        } else {
            let updatedDeps;
            if (checked) {
                updatedDeps = [...deps, value];
            } else {
                updatedDeps = deps.filter((dep) => dep !== value);
            }
            setDeps(updatedDeps);
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = {
            ...FormD,
            targeteddepartments: deps.join(","),
        };
        console.log(formData);
        try {
            const response = await axios.post("/api/users/document", formData);
            console.log("Document submission successful", response.data);
            console.log(formData);
        } catch (error) {
            console.error("Document submission failed", error.message);
            setError(true);
        }
    };

    const handleReset = () => {
        setFormD({
            title: "",
            targeteddepartments: "",
            uploadDocument: "",
        });
    };

    return (
        <div className="formDocuments">
            <h1>Form Documents</h1>
            <form onSubmit={handleForm}>
                <label htmlFor="title">Title*</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={FormD.title}
                    onChange={(e) => setFormD({ ...FormD, title: e.target.value })}
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
                                                    checked={deps.length === 6}
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
                                                    value="Development"
                                                    checked={deps.includes("Development")}
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
                                                    value="Design"
                                                    checked={deps.includes("Design")}
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
                                                    value="Project management"
                                                    checked={deps.includes("Project management")}
                                                    onChange={handleDepChange}
                                                />
                                                Project management
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="Content"
                                                    checked={deps.includes("Content")}
                                                    onChange={handleDepChange}
                                                />
                                                Content
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="Sales & Marketing"
                                                    checked={deps.includes("Sales & Marketing")}
                                                    onChange={handleDepChange}
                                                />
                                                Sales & Marketing
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="dep"
                                                    value="Customer Support"
                                                    checked={deps.includes("Customer Support")}
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
                <label htmlFor="uploadDocument">Upload Document*</label>
                <input
                    type="file"
                    name="uploadDocument"
                    id="uploadDocument"
                    onChange={(e) => setFormD({ ...FormD, uploadDocument: e.target.files[0] })}
                    
                />
                <button type="reset" id="butt2" value="reset" onClick={handleReset}>Reset</button>
                <button type="submit" id="bu" value="Submit">Submit</button>
            </form>
        </div>
    );
}

export default FormDocuments;
