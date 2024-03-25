import React, { useState } from "react";
import AuthContext from "./MyContext";

function AuthState(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;