"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import "./internshipoffer.scss";

const InternshipOffers = ({ goBack }) => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post("/api/users/internshipoffers");
        console.log("Success", response.data);
        setOffers(response.data); // Set formations data in state
        toast.success("Formations imported successfully");
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };

    fetchOffers();
  }, []);

  const handleApply = (offer) => {
    console.log("Apply clicked for offer:", offer._id);
    setOffers(prevOffers => prevOffers.filter(prevOffer => prevOffer._id !== offer._id));
    router.push(`/importformintern?offerId=${offer._id}`);
  };

  return (
    <div className="internship-table">
      <Card className="reunion-card">
        <CardContent>
          <Typography variant="h5" component="div">
            Internship Offers
          </Typography>
          <List className="scrollable-list">
            {offers.map((offer, index) => (
              <div key={index}>
                <ListItem>
                <ListItemText 
    primary={offer.title} 
    secondary={
        <div>
            <span>{offer.requirements}</span>
            <br />
            <span style={{ marginLeft: "10px" }}>Posts: {offer.posts_number}</span>
        </div>
    } 
/>

                  <Button size="small" onClick={() => handleViewMore(offer.id)}>View More</Button>
                  <Button size="small" color="primary" onClick={() => handleApply(offer)}>Apply</Button>
                </ListItem>
                {index < offers.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
      <button className="back-button" onClick={goBack}>Back</button>
    </div>
  );
};

export default InternshipOffers;
