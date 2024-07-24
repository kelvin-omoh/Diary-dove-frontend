import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Usercontext } from '../../context/userContext';

const GoogleCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAuthInfo } = useContext(Usercontext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(location.search);

                // Check for error in the URL parameters
                const status = urlParams.get('status');
                const message = urlParams.get('message');

                if (status === 'error') {
                    console.error('Authentication failed:', message);
                    navigate("/login"); // Redirect to login page if there's an error
                    return;
                }

                const authData = JSON.parse(decodeURIComponent(urlParams.get('authData')));
                console.log(authData);

                if (authData) {
                    setAuthInfo(authData);
                    console.log(authData);


                    try {
                        const personalInfoResponse = await axios.get("api/users/personalinfo", {
                            headers: {
                                Authorization: `Bearer ${authData.token}`,
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
                        navigate("/setup");

                    } catch (error) {
                        console.error("Error while fetching user information:", error);
                    }
                } else {
                    console.error('Authentication failed');
                    navigate("/login"); // Redirect to login page if authData is missing
                }
            } catch (error) {
                console.log(error);
                console.error('Error fetching data:', error);
                navigate("/login"); // Redirect to login page on error
            }
        };

        fetchData();
    }, [location.search, navigate, setAuthInfo]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
