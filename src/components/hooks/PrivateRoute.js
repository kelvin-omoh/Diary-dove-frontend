import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Usercontext } from '../../context/userContext';
export const PrivateRoute = ({ element }) => {
    const { userInfo, logOut } = useContext(Usercontext);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        // Simulate checking for userInfo initially
        const checkToken = () => {
            if (userInfo.token) {
                console.log(JSON.parse(localStorage.getItem('authData'))?.token);
                setToken(JSON.parse(localStorage.getItem('authData'))?.token);
            } else {
                logOut()
            }

            if (!JSON.parse(localStorage.getItem('authData'))?.setup) {
                navigate("/setup")
            }

            setIsLoading(false);
        };

        checkToken();
    }, [userInfo]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    return token ? element : <Navigate to="/login" replace />;
};
