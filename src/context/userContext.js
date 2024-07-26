import React, { createContext, useEffect, useState } from "react";

export const Usercontext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [whatsappNumber, setWhatsappNumber] = useState('')
    const [userInfo, setUserInfo] = useState(() => {
        const storedAuthData = localStorage.getItem('authData');
        return storedAuthData ? JSON.parse(storedAuthData) : {};
    });
    const [verifyEmail, setVerifyEmail] = useState(() => {
        const storedVerifyEmail = localStorage.getItem('verifyEmail');
        return storedVerifyEmail ? JSON.parse(storedVerifyEmail).email : '';
    });

    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        if (storedAuthData) {
            const parsedData = JSON.parse(storedAuthData);
            if (parsedData?.token) {
                setUserInfo(parsedData);
            }
        }
    }, []);

    useEffect(() => {
        const storedVerifyEmail = localStorage.getItem('verifyEmail');
        if (storedVerifyEmail) {
            setVerifyEmail(JSON.parse(storedVerifyEmail).email);
        }
    }, []);

    const setAuthInfo = (data) => {
        console.log(data); // Debugging log
        setUserInfo(data);
        localStorage.setItem('authData', JSON.stringify(data));
    };

    const handleVerifyEmail = (email) => {
        localStorage.setItem('verifyEmail', JSON.stringify({ email }));
        setVerifyEmail(email);
    };

    const logOut = () => {
        console.log('Logging out'); // Debugging log
        setUserInfo({});
        localStorage.removeItem('authData');
        localStorage.removeItem('verifyEmail');
    };

    return (
        <Usercontext.Provider value={{ whatsappNumber, setWhatsappNumber, userInfo, handleVerifyEmail, setUserInfo, setAuthInfo, logOut, verifyEmail, setVerifyEmail }}>
            {children}
        </Usercontext.Provider>
    );
};
