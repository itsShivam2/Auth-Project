import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  // If user is authenticated, render the provided element, otherwise redirect to login page
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : null}
    />
  );
};

export default ProtectedRoute;
