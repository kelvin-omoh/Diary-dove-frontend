import React, { createContext, useEffect, useState } from "react";

export const Usercontext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('authData')) || {});
    const [verifyEmail, setVerifyEmail] = useState('');

    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        console.log('Stored Auth Data:', storedAuthData); // Debugging log
        if (storedAuthData) {
            const parsedData = JSON.parse(storedAuthData);
            if (parsedData?.token) {
                console.log('Parsed Auth Data:', parsedData); // Debugging log
                setUserInfo(parsedData);
            }
        }
    }, []);

    useEffect(() => {
        const storedVerifyEmail = localStorage.getItem('verifyEmail');
        console.log('Stored Verify Email:', storedVerifyEmail); // Debugging log
        if (storedVerifyEmail) {
            setVerifyEmail(JSON.parse(storedVerifyEmail).email);
        }
    }, []);

    const setAuthInfo = (data) => {
        console.log('Setting Auth Info:', data); // Debugging log
        setUserInfo(data);
        localStorage.setItem('authData', JSON.stringify(data));
    };

    const handleVerifyEmail = (email) => {
        localStorage.setItem('verifyEmail', JSON.stringify({ email }));
    };

    const logOut = () => {
        setUserInfo({});
        localStorage.removeItem('authData');
        localStorage.removeItem('verifyEmail');
    };

    return (
        <Usercontext.Provider value={{ userInfo, handleVerifyEmail, setUserInfo, setAuthInfo, logOut, verifyEmail, setVerifyEmail }}>
            {children}
        </Usercontext.Provider>
    );
};
