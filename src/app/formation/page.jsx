"use client"
import React, { useState } from "react";
import axios from "axios";
import "./Formation.scss";

function Formation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [resume, setResume] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [dep, setDep] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name_loc, setNameLocation] = useState("");
    const [location, setLocation] = useState("");
    const [formateur, setFormateur] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            contact,
            selectedOption,   
            resume,
            date,
            time,
            type,
            dep,
            name_loc,
            location,
            formateur,
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
        setType("");
        setDep("");
        setFormateur("");
        setNameLocation("");
        setLocation("");
    
    };

    return (
        <div className="formation">
            <h1>Form Formation</h1>
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
                <label htmlFor="dep">Targeted Department*</label>
                <select
                    name="dep"
                    id="dep"
                    value={dep}
                    onChange={(e) => setDep(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Department</option>
                    <option value="1">Development</option>
                    <option value="2">Design </option>
                    <option value="3">Project management</option>
                    <option value="4">Content</option>
                    <option value="5">Sales & Marketing</option>
                    <option value="6">Customer Support</option>
                </select>

                <label htmlFor="date">Start Date*</label>
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
                <label htmlFor="date">End Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    
                />

                <label htmlFor="type">Type*</label>
                <select
                    name="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value="" disabled>Select your type</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Online">Online</option>
                </select>

                {type === "Onsite" && (
                    <>
                        <label htmlFor="forma">Location*</label>
                        <input
                            type="text"
                            name="name_loc"
                            id="name_loc"
                            value={name_loc}
                            onChange={(e) => setNameLocation(e.target.value)}
                            placeholder="Enter Name Of The Location"
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location Link "
                            required
                        />
                    </>
                )}

                <label htmlFor="forma">Formateur*</label>
                <input
                    type="text"
                    name="forma"
                    id="forma"
                    value={formateur}
                    onChange={(e) => setFormateur(e.target.value)}
                    placeholder="Enter Title"
                    required
                />

                <label htmlFor="file">Upload Document</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setResume(e.target.files[0])}
                    placeholder="Enter Upload File"
                />
                <label htmlFor="about">Description*</label>
                    <textarea
                        name="about"
                        id="about"
                        cols="30"
                        rows="10"
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Provide more details"
                        required
                    ></textarea>
                
                <button type="reset" id="butt2" value="reset" onClick={handleReset}>Reset</button>
                <button type="submit" id="bu" value="Submit">Submit</button>
            </form>
        </div>
    );
}

export default Formation;
