import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Usercontext } from "../../context/userContext";
import useCheckToken from "./useCheckToken";
import axios from "axios";



export const PrivateRoute = ({ element }) => {
    const token = useCheckToken();
    console.log('Token in PrivateRoute:', token); // Debugging log
    return token ? element : <Navigate to="/login" replace />;
};