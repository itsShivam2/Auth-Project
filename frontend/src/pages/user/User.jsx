import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7400/api/v1/auth/current-user",
          { withCredentials: true }
        );
        if (response.ok) {
          setUserData(response.data);
        }
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Layout>
        <h1>Profile Page</h1>
        {error && <div>{error}</div>}
        {userData && (
          <div>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            {/* Display other user data as needed */}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default User;
