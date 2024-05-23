"use client";
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./remun.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Link from "next/link";

const Remuns = () => {
    const [remforms, setRemforms] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);




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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userIdFromLocalStorage = localStorage.getItem("userId");
            setUserId(userIdFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log(userId);
                const response = await axios.post("/api/users/remun", { userId });
                console.log("Success", response.data);
                
                setRemforms(response.data || []); // Ensure remforms is set as an array
                console.log(remforms);
                toast.success("Users imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        if (userId) {
            fetchUsers();
        }
    }, [userId]);

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Title</TableCell>
                        <TableCell className="tableCell">Dedicated User</TableCell>
                        <TableCell className="tableCell">Document</TableCell>
                        <TableCell className="tableCell">Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(remforms) && remforms.map((remform, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{remform.title}</TableCell> {/* Assuming title is the property for user's name */}
                            <TableCell className="tableCell">{remform.persons}</TableCell> {/* Join persons array */}
                            <TableCell className="tableCell">
                                {remform.uploadDocument.fileName}
                            </TableCell>
                            {remform.uploadDocument && (
                                        <Button className="Button" variant="contained" color="primary">
                                            <a
                                                href={getUrl(remform.uploadDocument)} // Use the returned value from getUrl
                                                download={remform.uploadDocument.fileName}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                Download
                                            </a>
                                        </Button>
                                    )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Remuns;
