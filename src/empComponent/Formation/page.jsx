"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./EmpFormation.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const EmpFormation = () => {
    const [formations, setformations] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchformations = async () => {
            try {
                const response = await axios.post("/api/users/rtformation");
                console.log("Success", response.data);
                setformations(response.data); // Set formations data in state
                toast.success("formations imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        fetchformations();
    }, []);

    const handleViewMore = (reunionId) => {
        console.log("View More clicked for reunion:", reunionId);
    };

    return (
        <div className="formation-container">
            <Card className="reunion-card">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Formations
                    </Typography>
                    <List className="scrollable-list">
                        {formations.map((formation, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemText 
                                        primary={formation.title} 
                                        secondary={formation.description} 
                                    />
                                    <Button size="small" onClick={() => handleViewMore(formation.id)}>View More</Button>
                                </ListItem>
                                {index < formations.length - 1 && <Divider />}
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmpFormation;
