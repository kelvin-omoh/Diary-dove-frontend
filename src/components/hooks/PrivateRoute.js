import React from "react";
import { Navigate } from "react-router-dom";
import useCheckToken from "./useCheckToken";



export const PrivateRoute = ({ element }) => {
    const token = useCheckToken();
    console.log('Token in PrivateRoute:', token); // Debugging log
    return token ? element : <Navigate to="/login" replace />;
};