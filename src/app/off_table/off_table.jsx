import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { toast } from 'react-hot-toast';
import "./off_table.scss";
import Button from "@mui/material/Button"; 

const Off_table = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post("/api/users/off_table");
        console.log("Success", response.data);
        setOffers(response.data); // Set offers data in state
        toast.success("Offers imported successfully");
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };
    
    fetchOffers();
  }, []);

  const handleDeleteOffer = async (offer) => {
    try {
        const id = offer._id;
        console.log("Offer ID:", offer._id); 
        const response = await axios.delete(`/api/users/delete/${id}`);
        console.log(`response= ${response}`);
        if (response.status == 200) {
            toast.success("Offer deleted successfully");
        } else {
            toast.error("Failed to delete offer");
        }
    } catch (error) {
        console.error("Error deleting offer:", error);
        toast.error("Failed to delete offer");
    }
};




  return (
    <div className="offers-container">
      {offers.map((offer, index) => (
        <div className="offer-card" key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                {offer.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {offer.type === "employment" ? "Employment Offer" : "Internship Offer"}
              </Typography>
              <Grid container justifyContent="center"> {/* Center align content */}
                <Grid item xs={6}> {/* Adjust width as per your requirement */}
                  <Typography variant="body1">
                    Start Date: {offer.startdate.slice(0, 10)}
                  </Typography>

                  <Typography variant="body1">
                    {offer.type === "internship" && `End Date: ${offer.enddate.slice(0, 10)}`}
                  </Typography>
                  {offer.type === "internship" && (
                    <Typography variant="body1">
                      Is Paid: {offer.ispaid}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    {offer.type === "employment" && `Position: ${offer.position}`}
                  </Typography>
                  <Typography variant="body1">
                    {offer.type === "employment" && `Department: ${offer.department}`}
                  </Typography>
                  {/* You can add more details here */}
                </Grid>
                <Grid item xs={6}> {/* Adjust width as per your requirement */}
                  <Typography variant="body1">
                    Requirements: {offer.requirements}
                  </Typography>
                  <Typography variant="body1">
                    Description: {offer.description}
                  </Typography>
                  <Typography variant="body1">
                    Posts Number: {offer.posts_number}
                  </Typography>

                </Grid>
                <Grid container justifyContent="flex-end"> {/* Align buttons to the right */}
                <Button variant="outlined" color="secondary" className='margin right-2' onClick={() => handleDeleteOffer(offer)}>Delete</Button>
                <Button variant="outlined" color="primary" onClick={() => handleCheckApplications(offer._id)}>Check Applications</Button>
              </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Off_table;