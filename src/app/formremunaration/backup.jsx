"use client"
import React, { useState } from 'react';
import axios from "axios";
import Link from "next/link";
import Off_table from "../off_table/off_table"
const Formulaire = ({ onBackButtonClick }) => {
    const [error, setError] = useState(false);
    const [Offer, setOffer] = useState({
        type: "",
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
    const [formData, setFormData] = useState({
        type: 'internship',
        requirements: '',
        posts_number: '',
        description: '',
        title: "",
        startdate: "",
        enddate: "",
        ispaid: "",
        department: "",
        position: "",
    });
    const [additionalForms, setAdditionalForms] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Update Offer state with the changed value
        setOffer(prevOffer => ({
            ...prevOffer,
            [name]: value
        }));

        if (name === 'type') {
            if (value === 'internship') {
                // Add forms specific to internship
                setAdditionalForms(['enddate', 'ispaid']);
            } else if (value === 'employment') {
                // Add forms specific to employment
                setAdditionalForms(['position', 'department']);
            } else {
                // Reset additional forms if another type is selected
                setAdditionalForms([]);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to server)
        console.log(Offer);
        try {
            const response = await axios.post("/api/users/formulaire", Offer);
            console.log("Formulaire success", response.data);
        } catch (error) {
            console.log("Formulaire failed", error.message);
            setError(true);
        }
    };

    return (
        <div>
            <h1>Offer Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="internship">Internship</option>
                        <option value="employment">Employment</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <textarea id="title" name="title" value={formData.title} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label htmlFor="requirements">Requirements:</label>
                    <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label htmlFor="posts_number">Number of Posts:</label>
                    <input type="number" id="posts_number" name="posts_number" value={formData.posts_number} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="startdate">Start Date:</label>
                    <input type="date" id="startdate" name="startdate" value={formData.startdate} onChange={handleChange} required />
                </div>
                {/* Render additional forms based on selected type */}
                {additionalForms.map((formName, index) => (
                    <div key={index}>
                        <label htmlFor={formName}>{formName === 'enddate' ? 'End Date' : formName === 'ispaid' ? 'Is Paid' : formName.charAt(0).toUpperCase() + formName.slice(1)}:</label>
                        {formName === 'ispaid' ?
                            <select id={formName} name={formName} value={Offer[formName]} onChange={handleChange} required>
                                <option value="">...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            :
                            <input type={formName === 'enddate' ? 'date' : 'text'} id={formName} name={formName} value={Offer[formName]} onChange={handleChange} required={formName === 'position' || formName === 'department'} />
                        }
                    </div>
                ))}
                <button className='butt' type="submit">Submit</button>
                <button onClick={onBackButtonClick}>Back</button>
            </form>
        </div>
    );
};

export default Formulaire;
