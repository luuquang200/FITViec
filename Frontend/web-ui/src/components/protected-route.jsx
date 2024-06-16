/*
 * This component is used to protect routes from unauthorized access.
 * It checks if the user is logged in and if the user has the required role to access the route.
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children, allowedRole = "none" }) => {
    const { currentUser } = useAuth();

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
