import React, { useContext, useEffect } from 'react';
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
                const authData = JSON.parse(decodeURIComponent(urlParams.get('authData')));
                console.log(authData);

                if (authData) {
                    setAuthInfo(authData)
                    console.log(authData);
                    navigate('/dashboard');
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


    return <div>Loading...</div>;
};

export default GoogleCallback;
