import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRouteVerify = ({ children, allowedRole }) => {
    const { isRegistered, currentUser } = useAuth();

    if (!isRegistered) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRouteVerify;
