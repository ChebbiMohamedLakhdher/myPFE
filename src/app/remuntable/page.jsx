"use client"
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
import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from "next/link";

const Remuns = () => {
    const [remforms, setremforms] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check if window object is defined (client side)
            const userIdFromLocalStorage = localStorage.getItem("userId");
            setUserId(userIdFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log(userId)
                const response = await axios.post("/api/users/remun", { userId });
                console.log("Success", response.data);
                setremforms(response.data); // Set users data in state
                toast.success("Users imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        if (userId) {
            // Only fetch users if userId is available
            fetchUsers();
        }
    }, [userId]);

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                        <TableCell className="tableCell">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(remforms) && remforms.map((remform, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{remform.title}</TableCell> {/* Assuming title is the property for user's name */}
                            <TableCell className="tableCell">{remform.persons.join(', ')}</TableCell> {/* Assuming persons is an array, join it with comma */}
                            <TableCell className="tableCell">
                                {/* You can add status here */}
                            </TableCell>
                            {/* You can add action buttons here */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Remuns;
