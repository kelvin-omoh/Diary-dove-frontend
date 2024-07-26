// axiosInstance.js
import axios from 'axios';
import { Usercontext } from '../context/userContext'; // Adjust the path as needed
import { useContext } from 'react';

const axiosInstance = axios.create();

const logOut = () => {
    console.log('Logging out'); // Debugging log
    localStorage.removeItem('authData');
    localStorage.removeItem('verifyEmail');
    // Optional: If using React Router, you might want to use history to redirect
    window.location.href = '/login'; // Redirect to login page
};

const setAuthInfo = (data) => {
    console.log(data); // Debugging log
    localStorage.setItem('authData', JSON.stringify(data));
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const storedAuthData = JSON.parse(localStorage.getItem('authData'));
                const refreshToken = storedAuthData?.refreshtoken
                    ; // Ensure the token name matches
                console.log(refreshToken);
                if (refreshToken) {
                    // Request a new token using the refresh token

                    // Update local storage and axios headers with the new token
                    storedAuthData.token = refreshToken;
                    localStorage.setItem('authData', JSON.stringify(storedAuthData));

                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${refreshToken}`;

                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.log('Failed to refresh token:');
                console.log(error.response);
                logOut(); // Logout the user if refreshing the token fails
            }
        } else {
            logOut(); // Logout the user
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;
