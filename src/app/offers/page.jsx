"use client"
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Off_table from "../off_table/off_table"; // Assuming this is the component for displaying offers
import Formulaire from "../formulaire/formulaire"; // Assuming this is the component for adding offers
import "./offers.scss";

const Offers = () => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  return (
    <div className="Offers">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <div className="sec">
          {buttonPressed === false ? <Off_table /> : <Formulaire />}
          <button className="acc" onClick={handleButtonClick} variant="contained" color="primary">
            Add Offers
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default Offers;
