"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { toast } from 'react-hot-toast';
import "./Formation.scss";
import Button from "@mui/material/Button"; 
import FormFormation from "../formformation/Formformation"

const Formation = () => {
  const [Formations, setFormations] = useState([]);
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  const handleDelete = async (Formation) => {
    try {
      const response = await axios.delete(`/api/users/delformation`, { data: { FormationId: Formation._id } });
      
  
      console.log("response:", response);
  
      if (response.status === 200) {
        toast.success("Offer deleted successfully");
        
        // Update the offers state to exclude the deleted offer
        setFormations(prevFormations => prevFormations .filter(prevFormation => prevFormation._id !== Formation._id));
      } else {
        toast.error("Failed to delete offer");
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
      toast.error("Failed to delete offer");
    }
  };

  const getUrl = (uploadDocument) => {
    if (uploadDocument) {
      const contentType = uploadDocument.contentType;
      const data = uploadDocument.data;

      // Création d'un blob à partir des données
      const blob = new Blob([new Uint8Array(data.data)], { type: contentType });

      // Création de l'URL de données (Data URL) à partir du blob
      return URL.createObjectURL(blob); // Retourner directement l'URL de données
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post("/api/users/rtformation");
        console.log("Success", response.data);
        setFormations(response.data); // Set offers data in state
        toast.success("Formation imported successfully");
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
        Formations.map((Formation, index) => (
          <div className="reunion-card" key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Title: {Formation.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  StartDate: {Formation.date }
                </Typography>
                <Typography variant="body1">
                  Time: {Formation.time}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  EndDate: {Formation.date }
                </Typography>
                <Grid container justifyContent="center"> {/* Center align content */}
                  <Grid item xs={6}> {/* Adjust width as per your requirement */}
                    
                    <Typography variant="body1">
                      Targeted department: {Formation.targeteddepartments}
                    </Typography>
                    <Typography variant="body1">
                      type: {Formation.type}
                    </Typography>
                    <Typography variant="body1">
                      Name Location: {Formation.namelocation}
                    </Typography>
                    <Typography variant="body1">
                      Location: {Formation.location}
                    </Typography>
                    <Typography variant="body1">
                      formateur: {Formation.formateur}
                    </Typography>  
                    <Typography variant="body1">
                      description: {Formation.description}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      Fichier:
                      {Formation.uploadDocument && ( // Vérifier si le document est présent
                        <a
                          href={getUrl(Formation.uploadDocument)} // Utiliser directement la valeur retournée par getUrl
                          download={Formation.uploadDocument.fileName}
                        >
                          {Formation.uploadDocument.fileName}
                        </a>
                      )}
                    </Typography>
                    {/* You can add more details here */}
                  </Grid>
                  <Grid item xs={6}> {/* Adjust width as per your requirement */}
                  </Grid>
                  <Grid container justifyContent="flex-end"> {/* Align buttons to the right */}
                    <Button variant="outlined" color="secondary" className='margin right-2' onClick={() => handleDelete(Formation)}>Delete</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        // If button is pressed, display FormReunion
        <FormFormation />
      )}
      {!buttonPressed && (
        <button className="acc" onClick={handleButtonClick} variant="contained" color="primary">
          Add Offers
        </button>
      )}
    </div>
  );
}

export default Formation;
