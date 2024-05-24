"use client";
import React, { useState } from "react";
import Image from "next/image";
import pixelcutImage from "../../components/pixelcut-export.jpeg";
import JobOffers from "../joboffer/page";
import InternshipOffers from "../internshipoffer/page";
import "./candidat.scss";

const Candidat = () => {
  const [showJobOffers, setShowJobOffers] = useState(false);
  const [showInternshipOffers, setShowInternshipOffers] = useState(false);

  const toggleJobOffers = () => {
    setShowJobOffers(true);
    setShowInternshipOffers(false);
  };

  const toggleInternshipOffers = () => {
    setShowInternshipOffers(true);
    setShowJobOffers(false);
  };

  const goBack = () => {
    setShowJobOffers(false);
    setShowInternshipOffers(false);
  };

  return (
    <div className="main">
      <div className="static top-15 left-40">
        <h1>I'm looking for...</h1>
      </div>
      <div className="container">
        {!showJobOffers && !showInternshipOffers && (
          <div className="card">
            <div className="card-section">
              <button onClick={toggleJobOffers}>Job Offers</button>
            </div>
            <div className="card-section">
              <button onClick={toggleInternshipOffers}>Internship</button>
            </div>
          </div>
        )}
        {showJobOffers && <JobOffers goBack={goBack} />}
        {showInternshipOffers && <InternshipOffers goBack={goBack} />}
        <div className="image-container">
          <Image src={pixelcutImage} alt="Candidate" />
        </div>
      </div>
    </div>
  );
};

export default Candidat;
