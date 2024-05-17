"use client"
import "./conge.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../empComponent/Sidebar/page";
import React, { useState } from "react";
import Widget from "../../../empComponent/empWidget/page";
import Formconge from "../formconge/page";
import Formmedical from "../formmedical/page"; // Import Formmedical component

function Accordion({ title, onClick }) {
    return (
        <div className="accordion">
            <div className="accordion-title" onClick={onClick} style={{ cursor: 'pointer' }}>
                {title}
            </div>
        </div>
    );
}

export default function Conge() {
    const [showForm, setShowForm] = useState(null); // Initialize showForm with null
                                                        // to track which accordion is clicked

    const handleAccordionClick = (type) => { // Modify handleAccordionClick to take type argument
        setShowForm(type === showForm ? null : type); // Toggle showForm based on clicked accordion
    };

    return (
        <div className="Conge">
            <Sidebar />
            <div className="adminContainer">
                <Navbar />
                <div className="mainContent">
                    <div className="widgets">
                        <Widget type="user" amount={10} />
                        <div className="rl">
                            <Accordion title="Request Leave" onClick={() => handleAccordionClick('conge')} />
                            <Accordion title="Inform Leave" onClick={() => handleAccordionClick('medical')} />
                        </div>
                    </div>
                    <div className="formWidget">
                        {showForm === 'conge' && <Formconge />}
                        {showForm === 'medical' && <Formmedical />} {/* Render Formmedical if showForm is 'medical' */}
                    </div>
                </div>
            </div>
        </div>
    );
}
