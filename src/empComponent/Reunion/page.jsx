"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./EmpReunion.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const EmpReunion = () => {
    const [reunions, setReunions] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchReunions = async () => {
            try {
                const response = await axios.post("/api/users/rtreunion");
                console.log("Success", response.data);
                setReunions(response.data); // Set Reunions data in state
                toast.success("Reunions imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        fetchReunions();
    }, []);

    const handleViewMore = (reunionId) => {
        console.log("View More clicked for reunion:", reunionId);
    };

    return (
        <div className="reunion-container">
            <Card className="reunion-card">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Reunions
                    </Typography>
                    <List>
                        {reunions.map((reunion, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemText 
                                        primary={reunion.title} 
                                        secondary={reunion.description} 
                                    />
                                    <Button size="small" onClick={() => handleViewMore(reunion.id)}>View More</Button>
                                </ListItem>
                                {index < reunions.length - 1 && <Divider />}
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmpReunion;
