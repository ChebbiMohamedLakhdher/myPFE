"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { toast } from 'react-hot-toast';
import "./congeoff.scss";
import Button from "@mui/material/Button";

const Congeoff = () => {
  const [conges, setConge] = useState([]);
  const [users, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post("/api/users/congeoff");
        console.log("Success", response.data);
        setConge(response.data); // Set offers data in state
        toast.success("Offers imported successfully");
      } catch (error) {
        console.log("Failed", error.response?.data?.error || "Unknown error");
        setError(error.response?.data?.error || "Unknown error");
      }
    };

    fetchOffers();
  }, []);

  const fetchUser = async (employeeId) => {
    try {
      const response = await axios.post("/api/users/congeuser", { _id: employeeId });
      console.log("Success", response.data);
      setUser(prevUsers => ({ ...prevUsers, [employeeId]: response.data }));
      toast.success("User data imported successfully");
    } catch (error) {
      console.log("Failed", error.response?.data?.error || "Unknown error");
      setError(error.response?.data?.error || "Unknown error");
    }
  };

  useEffect(() => {
    // Fetch user data for each employeeId in conges
    conges.forEach(conge => {
      if (!users[conge.employeeId]) {
        fetchUser(conge.employeeId);
      }
    });
  }, [conges]);

  return (
    <div className="offers-container">
      {conges.map((conge, index) => (
        <div className="offer-card" key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                {conge.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
              </Typography>
              <Grid container justifyContent="center"> {/* Center align content */}
                <Grid item xs={6}> {/* Adjust width as per your requirement */}
                  <Typography variant="body1">
                    Start Date: {conge.startdate.slice(0, 10)}
                  </Typography>

                  <Typography variant="body1">
                    {conge.type === "medical" && `End Date: ${conge.enddate.slice(0, 10)}`}
                  </Typography>
                  {conge.type === "internship" && (
                    <Typography variant="body1">
                      Is Paid: {conge.ispaid}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    {conge.type === "employment" && `Position: ${conge.position}`}
                  </Typography>
                  <Typography variant="body1">
                    {conge.type === "employment" && `Department: ${conge.department}`}
                  </Typography>
                  {/* You can add more details here */}
                </Grid>
                <Grid item xs={6}> {/* Adjust width as per your requirement */}
                  <Typography variant="body1">
                    End Date: {conge.enddate.slice(0, 10)}
                  </Typography>
                  <Typography variant="body1">
                    Description: {conge.description}
                  </Typography>
                  <Typography variant="body1">
                    Employee: {users[conge.employeeId] ? users[conge.employeeId] : 'Loading...'}
                  </Typography>
                </Grid>
                <Grid container justifyContent="flex-end"> {/* Align buttons to the right */}
                  <Button variant="outlined" color="secondary" className='margin right-2' onClick={() => handleDeleteOffer()}>Accept</Button>
                  <Button variant="outlined" color="primary" onClick={() => handleCheckApplications()}>Refuse</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Congeoff;
