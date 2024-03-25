import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve token from wherever it's stored (e.g., cookies)
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];

        if (!accessToken) {
          // Handle case where token is not available
          return;
        }

        // Make GET request to current-user endpoint with token in headers
        const response = await axios.get(
          'http://localhost:7400/api/v1/auth/current-user',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        // Set user data in state
        setUserData(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user information as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserProfile;
