"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formmedical.scss";

function FormMedical() {
    const [leaveType, setLeaveType] = useState("normal");
    const [FormM, setFormM] = useState({
        title: "",
        startdate: "",
        enddate: "",
        uploadDocument: "",
        description: "",
    });
    const [error, setError] = useState(null);

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('startdate', FormM.startdate);
        formData.append('enddate', FormM.enddate);
        formData.append('description', FormM.description);

        if (leaveType === "medical") {
            const file = FormM.uploadDocument;
            formData.append('uploadDocument', file);
        }

        try {
            const response = await axios.post("/api/users/forms", formData);
            console.log("Form submission successful", response.data);
        } catch (error) {
            console.error("Form submission failed", error.message);
            setError(true);
        }
    };

    const handleReset = () => {
        setFormM({
            startdate: "",
            enddate: "",
            uploadDocument: "",
            description: "",
        });
    };

    return (
        <div className="formmedical">
            <h1>Inform Day Off</h1>
            <fieldset>
                <form onSubmit={handleForm}>
                  

                                  
                    <label htmlFor="startdate">Start Date*</label>
                    <input
                        type="date"
                        name="startdate"
                        id="startdate"
                        value={FormM.startdate}
                        onChange={(e) => setFormM({ ...FormM, startdate: e.target.value })}
                        required
                    />

                    <label htmlFor="enddate">End Date*</label>
                    <input
                        type="date"
                        name="enddate"
                        id="enddate"
                        value={FormM.enddate}
                        onChange={(e) => setFormM({ ...FormM, enddate: e.target.value })}
                        required
                    />

                   
                            <label htmlFor="uploadDocument">Upload Document</label>
                            <input
                                type="file"
                                name="uploadDocument"
                                id="uploadDocument"
                                onChange={(e) => setFormM({ ...FormM, uploadDocument: e.target.files[0] })}
                                placeholder="Upload Document"
                                required
                            />
                        
                    
                    
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        onChange={(e) => setFormM({ ...FormM, description: e.target.value })}
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

export default FormMedical;
