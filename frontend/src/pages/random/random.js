//
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in on component mount
//     checkLoginStatus();
//   }, []);

//   const checkLoginStatus = async () => {
//     try {
//       const response = await axios.get('http://localhost:7400/api/v1/auth/current-user', { withCredentials: true });
//       setUsername(response.data.username);
//       setUserDetails(response.data);
//       setLoggedIn(true);
//     } catch (error) {
//       console.error('Error checking login status:', error);
//       setLoggedIn(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:7400/api/v1/auth/login', { username, password }, { withCredentials: true });
//       setUsername(response.data.username);
//       setLoggedIn(true);
//       setError('');
//       setMessage('Login successful');

//       // Fetch user details after successful login
//       const userDetailsResponse = await axios.get('http://localhost:7400/api/v1/auth/current-user', { withCredentials: true });
//       setUserDetails(userDetailsResponse.data);
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('Invalid username or password');
//       setMessage('');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:7400/api/v1/auth/logout', null, { withCredentials: true });
//       setUsername('');
//       setUserDetails(null);
//       setLoggedIn(false);
//       setError('');
//       setMessage('Logout successful');
//     } catch (error) {
//       console.error('Logout error:', error);
//       setError('Failed to logout');
//       setMessage('');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-gray-800 py-4 text-white">
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <div className="flex items-center">
//             <span className="font-semibold text-xl">My App</span>
//           </div>
//           <div>
//             {loggedIn ? (
//               <>
//                 <span className="mr-4">{`Hello, ${username}`}</span>
//                 <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
//               </>
//             ) : (
//               <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => setLoggedIn(true)}>Login</button>
//             )}
//           </div>
//         </div>
//       </nav>
//       <div className="container mx-auto mt-8">
//         {!loggedIn ? (
//           <div className="max-w-md mx-auto">
//             <h2 className="text-xl font-semibold mb-4">Login</h2>
//             <form onSubmit={handleLogin}>
//               <div className="mb-4">
//                 <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
//                 <input type="text" id="username" className="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value={username} onChange={(e) => setUsername(e.target.value)} />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
//                 <input type="password" id="password" className="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <div className="text-red-600 mb-4">{error}</div>
//               <div className="text-green-600 mb-4">{message}</div>
//               <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Login</button>
//             </form>
//           </div>
//         ) : (
//           userDetails ? (
//             <div>
//               <h2 className="text-xl font-semibold">User Details</h2>
//               <p>First Name: {userDetails.firstName}</p>
//               <p>Last Name: {userDetails.lastName}</p>
//               <p>Email: {userDetails.email}</p>
//               <p>Date of Birth: {userDetails.dateOfBirth}</p>
//               <p>Role: {userDetails.role}</p>
//             </div>
//           ) : (
//             <h2 className="text-xl font-semibold">Loading user details...</h2>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
