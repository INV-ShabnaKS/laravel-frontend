import React from "react";
import { Navigate } from "react-router-dom";

function authHoc(WrappedComponent) {
  return function ProtectedComponent(props) {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token → redirect to login
      return <Navigate to="/login" replace />;
    }

    // Token exists → show the original component
    return <WrappedComponent {...props} />;
  };
}

export default authHoc;
