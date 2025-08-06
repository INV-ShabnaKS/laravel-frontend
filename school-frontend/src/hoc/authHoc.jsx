import React from "react";
import { Navigate } from "react-router-dom";

function authHoc(WrappedComponent) {
  return function ProtectedComponent(props) {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <WrappedComponent {...props} />;
  };
}

export default authHoc;
