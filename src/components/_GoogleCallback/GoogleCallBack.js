import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Usercontext } from '../../context/userContext';

const GoogleCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { setAuthInfo, userInfo } = useContext(Usercontext);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const authData = JSON.parse(decodeURIComponent(urlParams.get('authData')));
                console.log(authData);

                if (authData) {
                    setAuthInfo(authData)
                    console.log(authData);
                    navigate('/dashboard');

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


                    } catch (error) {
                        console.error("Error while fetching user information:", error);
                    }


                } else {
                    console.error('Authentication failed');
                }
            } catch (error) {
                console.log(error);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location.search, navigate]);

    // useEffect(() => {
    //     const handleAuthCallback = async () => {

    //         const queryParams = new URLSearchParams(window.location.search);
    //         const code = queryParams.get('code');
    //         const targetUrl = "https://dairydoveii.onrender.com/auth/google/callback";
    //         const currentUrl = window.location.href.split('?')[0];
    //         if (code) {
    //             try {
    //                 const response = await axios.get(`/auth/google/callback${location.search}`);

    //                 const { token, refreshtoken, username, email, setup } = response.data.data;
    //                 console.log(response.data);
    //                 console.log(currentUrl);

    //                 setAuthInfo({
    //                     token,
    //                     refreshtoken,
    //                     username,
    //                     email,
    //                     setup,
    //                 });
    //                 if (currentUrl === targetUrl) {
    //                     navigate('/dashboard'); // Redirect to dashboard page
    //                 }
    //             } catch (error) {
    //                 console.error('Authentication failed', error);
    //                 // Handle error, redirect to login, or show error message
    //             }
    //         }
    //     };

    //     handleAuthCallback();
    // }, [navigate, location.search]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
