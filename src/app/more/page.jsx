"use client"
import axios from 'axios'; // Import axios for making HTTP requests
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // Assuming you have react-toastify installed
import './more.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const More = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('/api/users/employees');
        const urID = new URLSearchParams(window.location.search).get('id');
        console.log('Success', response.data);
        const user = response.data.find(u => u._id === urID); // Find the user with specified ID
        if (user) {
          setUser(user); // Set the user data in state
          toast.success('User information loaded successfully');
        } else {
          setError('User not found');
          toast.error('User not found');
        }
      } catch (error) {
        console.log('Failed', error.response?.data?.error || 'Unknown error');
        setError(error.response?.data?.error || 'Unknown error');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {user && (
              <>
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{user.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{user.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{user.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{user.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Position:</span>
                      <span className="itemValue">{user.country}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {error && <div>Error: {error}</div>}
          </div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default More;
