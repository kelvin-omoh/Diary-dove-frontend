import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Usercontext } from '../../context/userContext';
import axios from 'axios';
import axiosInstance from '../../Utils/axiosInstance';

const GoogleCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAuthInfo } = useContext(Usercontext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const authData = JSON.parse(decodeURIComponent(urlParams.get('authData')));
                console.log(authData);

                if (authData) {
                    // Extract token and other data
                    const { token } = authData;

                    // Fetch additional user info if necessary
                    try {
                        const personalInfoResponse = await axiosInstance.get("api/users/personalinfo", {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        });

                        const personalInfo = personalInfoResponse.data.data.reduce((acc, item) => {
                            const [key, value] = Object.entries(item)[0];
                            acc[key] = value;
                            return acc;
                        }, {});

                        // Combine authentication data with personal info
                        const completeUserInfo = { ...authData, ...personalInfo };
                        localStorage.setItem("userInfo", JSON.stringify(completeUserInfo));
                        setAuthInfo(completeUserInfo);
                        navigate('/dashboard');
                    } catch (error) {
                        console.error("Error while fetching user information:", error);
                        navigate('/error'); // Redirect to an error page or handle accordingly
                    }
                } else {
                    console.error('Authentication failed');
                    navigate('/login'); // Redirect to login page or handle accordingly
                }
            } catch (error) {
                console.error('Error parsing authentication data:', error);
                navigate('/login'); // Redirect to login page or handle accordingly
            }
        };

        fetchData();
    }, [location.search, navigate, setAuthInfo]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
