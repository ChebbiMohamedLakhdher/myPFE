import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./table.scss";
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

const List = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post("/api/users/employees");
                console.log("Success", response.data);
                setUsers(response.data); // Set users data in state
                toast.success("Users imported successfully");
            } catch (error) {
                console.log("Failed", error.response?.data?.error || "Unknown error");
                setError(error.response?.data?.error || "Unknown error");
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const MakeAd = async (userId) => {
        console.log("Received user ID:", userId);
        try {
            await axios.post("/api/users/makead", { userId }); // Send userId instead of token

            toast.success('Role changed successfully');
            // Refresh the user list after changing the role

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const handleViewMore = (userId) => {
        console.log("View More clicked for user:", userId);
    };

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
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{user.name}</TableCell>
                            <TableCell className="tableCell">{user.email}</TableCell>
                            <TableCell className="tableCell">
                                {user.isAdmin ? "Admin" : "Employee"}
                            </TableCell>
                            <TableCell className="tableCell">
                                <Link href={`/more?id=${user._id}`}>
                                    <Button className="acc1" onClick={() => handleViewMore(user.id)} variant="contained" color="primary">View</Button>
                                </Link>
                                <Button className="acc2" onClick={() => {
                                    console.log("Clicked user ID:", user._id);
                                    MakeAd(user._id);
                                }} variant="contained" color="primary">Change Role</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
