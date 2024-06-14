import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children, allowedRole = "none" }) => {
    const { isRegistered, currentUser } = useAuth();

    if (currentUser?.role !== allowedRole) {
        if (currentUser?.role === "admin") {
            return <Navigate to="/admin" />;
        } else if (currentUser?.role === "employer") {
            return <Navigate to="/employer" />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return children;
};

export default ProtectedRoute;
