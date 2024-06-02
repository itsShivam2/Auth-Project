import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7400/api/v1/user/${userId}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching user details"
        );
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center gap-1 p-4">
      <h2 className="text-2xl font-semibold">User Details</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <div className="w-full flex justify-center">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold mt-4 py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
