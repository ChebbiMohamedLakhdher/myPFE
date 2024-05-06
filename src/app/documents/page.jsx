"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { toast } from 'react-hot-toast';
import "./Documents.scss";
import Button from "@mui/material/Button"; 
import FormDocument from "../formdocument/Formdocument"

const Document = () => {
  const [Documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post("/api/users/rtdocuments");
        console.log("Success", response.data);
        setDocuments(response.data); // Set offers data in state
        toast.success("Document imported successfully");
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };
    
    fetchOffers();
  }, []);

  return (
    <div className="offers-container">
      {!buttonPressed ? (
        // If button is not pressed, display the content of Reunion
        Documents.map((Document, index) => (
          <div className="reunion-card" key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Title: {Document.title}
                </Typography>

                <Grid container justifyContent="center"> {/* Center align content */}
                  <Grid item xs={6}> {/* Adjust width as per your requirement */}
                    
                    <Typography variant="body1">
                      Documents: {Document.targeteddepartments}
                    </Typography>
                   
                    {/* You can add more details here */}
                  </Grid>
                  <Grid item xs={6}> {/* Adjust width as per your requirement */}
                  </Grid>
                  <Grid container justifyContent="flex-end"> {/* Align buttons to the right */}
                    <Button variant="outlined" color="secondary" className='margin right-2' onClick={() => handleDeleteOffer(Document)}>Delete</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        // If button is pressed, display FormReunion
        <FormDocument />
      )}
      {!buttonPressed && (
        <button className="acc" onClick={handleButtonClick} variant="contained" color="primary">
          Add Offers
        </button>
      )}
    </div>
  );
}

export default Document;
