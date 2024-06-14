import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRouteVerify = ({ children }) => {
    const { isRegistered } = useAuth();
    console.log(isRegistered);

    if (!isRegistered) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRouteVerify;
