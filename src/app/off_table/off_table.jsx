import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Paper from "@mui/material/Paper";


const Off_table = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.post("/api/users/off_table");
            console.log("Success", response.data);
            setOffers(response.data); // Set users data in state
            toast.success("Offers imported successfully");
        } catch (error) {
            console.log("Failed", error.response?.data?.error || "Unknown error");
            setError(error.response?.data?.error || "Unknown error");
        }
    };

    fetchUsers();
}, []);
  return (
    <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Type</TableCell>
                        <TableCell className="tableCell">Title</TableCell>
                        <TableCell className="tableCell">Requirements</TableCell>
                        <TableCell className="tableCell">Posts number</TableCell>
                        <TableCell className="tableCell">Description</TableCell>
                        <TableCell className="tableCell">StartDate</TableCell>
                        <TableCell className="tableCell">EndDate</TableCell>
                        <TableCell className="tableCell">IsPaid</TableCell>
                        <TableCell className="tableCell">Position</TableCell>
                        <TableCell className="tableCell">Department</TableCell>

                        
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {offers.map((offer, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{offer.type}</TableCell>
                            <TableCell className="tableCell">{offer.title}</TableCell>
                            <TableCell className="tableCell">{offer.requirements}</TableCell>
                            <TableCell className="tableCell">{offer.posts_number}</TableCell>
                            <TableCell className="tableCell">{offer.description}</TableCell>
                            <TableCell className="tableCell">{offer.startdate}</TableCell>
                            <TableCell className="tableCell">{offer.enddate}</TableCell>
                            <TableCell className="tableCell">{offer.ispaid}</TableCell>
                            <TableCell className="tableCell">{offer.position}</TableCell>
                            <TableCell className="tableCell">{offer.department}</TableCell>
                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    
  )
}

export default Off_table;