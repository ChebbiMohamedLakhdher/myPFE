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
import "./joboffer.scss";

const JobOffers = ({ goBack }) => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post("/api/users/joboffers");
        console.log("Success", response.data);
        setOffers(response.data);
        toast.success("Formations imported successfully");
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };

    fetchOffers();
  }, []);

  const handleViewMore = (offerId) => {
    console.log("View More clicked for offer:", offerId);
  };

  const handleApply = (offer) => {
    console.log("Apply clicked for offer:", offer._id);
    setOffers(prevOffers => prevOffers.filter(prevOffer => prevOffer._id !== offer._id));
    router.push(`/importformcand?offerId=${offer._id}`);
  };

  return (
    <div className="offers-table">
      <Card className="reunion-card">
        <CardContent>
          <Typography variant="h5" component="div">
            Job Offers
          </Typography>
          <List className="scrollable-list">
            {offers.map((offer, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText primary={offer.title}
                    secondary={
                      <div>
                        <span>{offer.requirements}</span>
                        <br />
                        <span style={{ marginLeft: "10px" }}>Posts: {offer.posts_number}</span>
                      </div>
                    } />
                  <Button size="small" onClick={() => handleViewMore(offer._id)}>View More</Button>
                  <Button size="small" color="primary" onClick={() => handleApply(offer)}>Apply</Button>
                </ListItem>
                {index < offer.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
      <button className="back-button" onClick={goBack}>Back</button>
    </div>
  );
};

export default JobOffers;
