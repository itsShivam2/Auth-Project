// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useRefreshToken from '../hooks/useRefreshToken';
// import useAuth from '../hooks/useAuth';

// const PersistLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const refresh = useRefreshToken();
//     const { auth, persist } = useAuth();

//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();
//             }
//             catch (err) {
//                 console.error(err);
//             }
//             finally {
//                 isMounted && setIsLoading(false);
//             }
//         }

//         // persist added here AFTER tutorial video
//         // Avoids unwanted call to verifyRefreshToken
//         !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

//         return () => isMounted = false;
//     }, [])

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
//     }, [isLoading])

//     return (
//         <>
//             {!persist
//                 ? <Outlet />
//                 : isLoading
//                     ? <p>Loading...</p>
//                     : <Outlet />
//             }
//         </>
//     )
// }

// export default PersistLogin


// import { useContext, useDebugValue } from "react";
// import AuthContext from "../context/AuthProvider";

// const useAuth = () => {
//     const { auth } = useContext(AuthContext);
//     useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
//     return useContext(AuthContext);
// }

// export default useAuth;


// //
// import axios from '../api/axios';
// import useAuth from './useAuth';

// const useRefreshToken = () => {
//     const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/refresh', {
//             withCredentials: true
//         });
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accessToken);
//             return {
//                 ...prev,
//                 roles: response.data.roles,
//                 accessToken: response.data.accessToken
//             }
//         });
//         return response.data.accessToken;
//     }
//     return refresh;
// };

// export default useRefreshToken;