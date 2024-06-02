import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "./UserDetails";
import Loader from "../../../components/loader/Loader";
const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://auth-project-tw37.onrender.com/api/v1/user/all-users",
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center my-8"><Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => setSelectedUserId(user._id)}
                >
                  View
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <UserDetails
              userId={selectedUserId}
              onClose={() => setSelectedUserId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );

  async function handleDeleteUser(userId) {
    try {
      await axios.delete(`https://auth-project-tw37.onrender.com/api/v1/user/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting user");
    }
  }
};

export default UsersTab;
