"use client"
import React, { useState } from "react";
import axios from "axios";
import "./formformation.scss";

function FormFormation() {
    const [error, setError] = useState(null);
    const [FormF, setFormF] = useState({
        title: "",
        targeteddepartments: "",
        startdate: "",
        time: "",
        enddate: "",
        type: "",
        namelocation: "",
        location: "",
        formateur: "",
        uploadDocument: "",
        description: "",
    });

    const handleReset = () => {
        // Reset all state variables here
        setFormF({
            title: "",
            targeteddepartments: "",
            startdate: "",
            time: "",
            enddate: "",
            type: "",
            namelocation: "",
            location: "",
            formateur: "",
            uploadDocument: "",
            description: "",
        });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = {
            ...FormF,
        };
        // Handle form submission here (e.g., send data to server)
        console.log(formData);
        try {
            const response = await axios.post("/api/users/formation", formData);
            console.log("Form submission successful", response.data);
            console.log(formData);
        } catch (error) {
            console.error("Form submission failed", error.message);
            setError(true);
        }
    };

    return (
        <div className="formformation">
            <h1>Form Formation</h1>
            <form onSubmit={handleForm}>
                <label htmlFor="title">Title*</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={FormF.title}
                    onChange={(e) => setFormF({ ...FormF, title: e.target.value })}
                    placeholder="Enter Title"
                    required
                />
                <label htmlFor="dep">Targeted Department*</label>
                <select
                    name="targeteddepartments"
                    id="dep"
                    value={FormF.targeteddepartments}
                    onChange={(e) => setFormF({ ...FormF, targeteddepartments: e.target.value })}
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

                <label htmlFor="startdate">Start Date*</label>
                <input
                    type="date"
                    name="startdate"
                    id="startdate"
                    value={FormF.startdate}
                    onChange={(e) => setFormF({ ...FormF, startdate: e.target.value })}
                    required
                />

                <label htmlFor="time">Time*</label>
                <input
                    type="time"
                    name="time"
                    id="time"
                    value={FormF.time}
                    onChange={(e) => setFormF({ ...FormF, time: e.target.value })}
                    required
                />
                <label htmlFor="enddate">End Date</label>
                <input
                    type="date"
                    name="enddate"
                    id="enddate"
                    value={FormF.enddate}
                    onChange={(e) => setFormF({ ...FormF, enddate: e.target.value })}
                />

                <label htmlFor="type">Type*</label>
                <select
                    name="type"
                    id="type"
                    value={FormF.type}
                    onChange={(e) => setFormF({ ...FormF, type: e.target.value })}
                    required
                >
                    <option value="" disabled>Select your type</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Online">Online</option>
                </select>

                {FormF.type === "Onsite" && (
                    <>
                        <label htmlFor="namelocation">Location*</label>
                        <input
                            type="text"
                            name="namelocation"
                            id="namelocation"
                            value={FormF.namelocation}
                            onChange={(e) => setFormF({ ...FormF, namelocation: e.target.value })}
                            placeholder="Enter Name Of The Location"
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={FormF.location}
                            onChange={(e) => setFormF({ ...FormF, location: e.target.value })}
                            placeholder="Enter Location Link "
                            required
                        />
                    </>
                )}

                <label htmlFor="formateur">Formateur*</label>
                <input
                    type="text"
                    name="formateur"
                    id="formateur"
                    value={FormF.formateur}
                    onChange={(e) => setFormF({ ...FormF, formateur: e.target.value })}
                    placeholder="Enter Formateur"
                    required
                />

                <label htmlFor="file">Upload Document</label>
                <input
                    type="file"
                    name="uploadDocument"
                    id="file"
                    onChange={(e) => setFormF({ ...FormF, uploadDocument: e.target.files[0] })}
                    placeholder="Enter Upload File"
                />
                <label htmlFor="description">Description*</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={FormF.description}
                    onChange={(e) => setFormF({ ...FormF, description: e.target.value })}
                    placeholder="Provide more details"
                    required
                ></textarea>

                <button type="reset" id="butt2" value="reset" onClick={handleReset}>Reset</button>
                <button type="submit" id="bu" value="Submit">Submit</button>
            </form>
        </div>
    );
}

export default FormFormation;
