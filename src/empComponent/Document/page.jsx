"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./EmpDocument.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const EmpDocument = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.post("/api/users/rtdocuments");
                console.log("Success", response.data);
                setDocuments(response.data); // Set documents data in state
                toast.success("Documents imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        fetchDocuments();
    }, []);

    const handleViewMore = (documentId) => {
        console.log("View More clicked for document:", documentId);
    };

    const getUrl = (uploadDocument) => {
        if (uploadDocument) {
            const contentType = uploadDocument.contentType;
            const data = uploadDocument.data;

            // Create a blob from the data
            const blob = new Blob([new Uint8Array(data.data)], { type: contentType });

            // Create a data URL from the blob
            return URL.createObjectURL(blob); // Return the data URL directly
        }
    };

    return (
        <div className="document-container">
            <Card className="document-card">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Documents
                    </Typography>
                    <List className="scrollable-list">
                        {documents.map((document, index) => (
                            <div key={index}>
                                <ListItem className="list-item">
                                    <ListItemText 
                                        primary={document.title} 
                                        secondary={document.targeteddepartments} 
                                        className="list-item-text"
                                    />
                                    {document.uploadDocument && (
                                        <Button className="Button" variant="contained" color="primary">
                                            <a
                                                href={getUrl(document.uploadDocument)} // Use the returned value from getUrl
                                                download={document.uploadDocument.fileName}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                Download
                                            </a>
                                        </Button>
                                    )}
                                </ListItem>
                                {index < documents.length - 1 && <Divider />}
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmpDocument;
