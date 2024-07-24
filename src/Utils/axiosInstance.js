// axiosInstance.js
import axios from 'axios';
import { Usercontext } from '../context/userContext'; // Adjust the path as needed
import { useContext } from 'react';

const axiosInstance = axios.create();


const logOut = () => {
    console.log('Logging out'); // Debugging log
    localStorage.removeItem('authData');
    localStorage.removeItem('verifyEmail');
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
                const refreshToken = storedAuthData?.refreshtoken;

                if (refreshToken) {
                    // Switch token to refresh token
                    storedAuthData.token = refreshToken;
                    localStorage.setItem('authData', JSON.stringify(storedAuthData));

                    axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${refreshToken}`;

                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.error('Failed to switch to refresh token:', err);
                logOut(); // Logout the user if switching fails
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
