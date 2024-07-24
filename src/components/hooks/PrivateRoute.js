import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Usercontext } from '../../context/userContext';
export const PrivateRoute = ({ element }) => {
    const { userInfo } = useContext(Usercontext);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        // Simulate checking for userInfo initially
        const checkToken = () => {
            if (userInfo) {
                console.log((userInfo));
                setToken(userInfo.token);
            }

            if (userInfo.setup === false) {
                navigate("/setup")
            }

            setIsLoading(false);
        };

        checkToken();
    }, [userInfo, userInfo?.setup, userInfo?.token]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    return token ? element : <Navigate to="/login" replace />;
};
