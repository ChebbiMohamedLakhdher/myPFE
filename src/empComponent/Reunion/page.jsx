"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./EmpReunion.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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

    return (
        <div className="reunion-container">
            <Card className="reunion-card">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Reunions
                    </Typography>
                    <Grid container spacing={3}>
                        {reunions.map((reunion, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper className={`reunion-section ${index % 3 === 0 ? 'personal-strength' : index % 3 === 1 ? 'communication' : 'leadership'}`}>
                                    <Typography variant="h6" className="reunion-title">
                                        {reunion.title}
                                    </Typography>
                                    <Typography variant="body2" className="reunion-description">
                                        {reunion.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmpReunion;
