"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./formulaire.scss";

function Formulaire() {
    const [Type, SetType] = useState(""); // Default is now empty string
    const [FormFor, setFormFor] = useState({
        requirements: "",
        posts_number: "",
        description: "",
        title: "",
        startdate: "",
        enddate: "",
        ispaid: "",
        department: "",
        position: "",
    });
    const [token, setToken] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        setToken(token || "");
        console.log(token);
    }, []);

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('requirements', FormFor.requirements);
        formData.append('posts_number', FormFor.posts_number);
        formData.append('description', FormFor.description);
        formData.append('title', FormFor.title);
        formData.append('startdate', FormFor.startdate);
        formData.append('token', token);

        if (Type === "internship") {
            formData.append('enddate', FormFor.enddate);
            formData.append('ispaid', FormFor.ispaid);
        } else if (Type === "employment") {
            formData.append('department', FormFor.department);
            formData.append('position', FormFor.position);
        }

        try {
            const response = await axios.post("/api/users/formulaire", formData);
            console.log("Form submission successful", response.data);
        } catch (error) {
            console.error("Form submission failed", error.message);
            setError(true);
        }
    };

    const handleReset = () => {
        setFormFor({
            requirements: "",
            posts_number: "",
            description: "",
            title: "",
            startdate: "",
            enddate: "",
            ispaid: "",
            department: "",
            position: "",
        });
    };

    return (
        <div className="formfor">
            <h1>Offer Form</h1>
            <fieldset>
                <form onSubmit={handleForm}>
                    <label htmlFor="Type">Type:</label>
                    <select
                        id="Type"
                        value={Type}
                        onChange={(e) => SetType(e.target.value)}
                        required
                    >
                        <option value="">Select Type</option> {/* Added default option */}
                        <option value="internship">Internship</option>
                        <option value="employment">Employment</option>
                    </select>

                    <label htmlFor="title">Title*</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={FormFor.title}
                        onChange={(e) => setFormFor({ ...FormFor, title: e.target.value })}
                        placeholder="Enter Title"
                        required
                    />
                    <label htmlFor="requirements">Requirements*</label>
                    <input
                        type="text"
                        name="requirements"
                        id="requirements"
                        value={FormFor.requirements}
                        onChange={(e) => setFormFor({ ...FormFor, requirements: e.target.value })}
                        placeholder="Enter requirements"
                        required
                    />
                    <label htmlFor="posts_number">Number of Posts:*</label>
                    <input
                        type="number"
                        name="posts_number"
                        id="posts_number"
                        value={FormFor.posts_number}
                        onChange={(e) => setFormFor({ ...FormFor, posts_number: e.target.value })}
                        required
                    />

                    <label htmlFor="startdate">Start Date*</label>
                    <input
                        type="date"
                        name="startdate"
                        id="startdate"
                        value={FormFor.startdate}
                        onChange={(e) => setFormFor({ ...FormFor, startdate: e.target.value })}
                        required
                    />

                    {Type === "internship" && (
                        <>
                            <label htmlFor="enddate">End Date*</label>
                            <input
                                type="date"
                                name="enddate"
                                id="enddate"
                                value={FormFor.enddate}
                                onChange={(e) => setFormFor({ ...FormFor, enddate: e.target.value })}
                                required
                            />
                            <label htmlFor="ispaid">Is Paid*</label>
                            <select
                                id="ispaid"
                                name="ispaid"
                                value={FormFor.ispaid}
                                onChange={(e) => setFormFor({ ...FormFor, ispaid: e.target.value })}
                                required
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </>
                    )}
                    {Type === "employment" && (
                        <>
                            <label htmlFor="department">Department*</label>
                            <input
                                type="text"
                                name="department"
                                id="department"
                                value={FormFor.department}
                                onChange={(e) => setFormFor({ ...FormFor, department: e.target.value })}
                                required
                            />
                            <label htmlFor="position">Position*</label>
                            <input
                                type="text"
                                name="position"
                                id="position"
                                value={FormFor.position}
                                onChange={(e) => setFormFor({ ...FormFor, position: e.target.value })}
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
                        value={FormFor.description}
                        onChange={(e) => setFormFor({ ...FormFor, description: e.target.value })}
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
        </div>
    );
}

export default Formulaire;
