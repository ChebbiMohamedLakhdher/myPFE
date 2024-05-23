"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import "./candidat.scss";
import pixelcutImage from "../../components/pixelcut-export.jpeg";

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
    <div className='main'>
      <div className='static top-15 left-40'>
        <h1>I'm looking for...</h1>
      </div>
      <div className='container'>
        {(!showJobOffers && !showInternshipOffers) && (
          <div className="card">
            <div className="card-section">
              <button onClick={toggleJobOffers}>Job Offers</button>
            </div>
            <div className="card-section">
              <button onClick={toggleInternshipOffers}>Internship</button>
            </div>
          </div>
        )}
        {showJobOffers && (
          <div className="offers-table">
            <table>
              <thead>
                <tr>
                  <th>Job Offer Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Job Offer 1</td>
                  <td>Offer details 1</td>
                </tr>
                <tr>
                  <td>Job Offer 2</td>
                  <td>Offer details 2</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
            <button onClick={goBack}>Back</button>
          </div>
        )}
        {showInternshipOffers && (
          <div className="offers-table">
            <table>
              <thead>
                <tr>
                  <th>Internship Offer Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Internship Offer 1</td>
                  <td>Offer details 1</td>
                </tr>
                <tr>
                  <td>Internship Offer 2</td>
                  <td>Offer details 2</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
            <button onClick={goBack}>Back</button>
          </div>
        )}
        <div className="image-container">
          <Image src={pixelcutImage} alt="Candidate" />
        </div>
      </div>
    </div>
  );
};

export default Candidat;
