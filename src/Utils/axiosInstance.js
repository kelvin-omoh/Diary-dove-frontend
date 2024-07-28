// axiosInstance.js
import axios from 'axios';
import { Usercontext } from '../context/userContext'; // Adjust the path as needed
import { useContext } from 'react';
import toast from 'react-hot-toast';

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
        if (error.response && error.response.status === 401) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
                    const refreshToken = storedAuthData?.refreshToken; // Ensure the token name matches

                    if (refreshToken) {
                        // Request a new token using the refresh token
                        const response = await axios.post('/api/auth/refresh', { refreshToken });
                        const { newToken } = response.data; // Adjust based on your API response

                        // Update local storage and axios headers with the new token
                        storedAuthData.token = newToken;
                        localStorage.setItem('authData', JSON.stringify(storedAuthData));

                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                        return axiosInstance(originalRequest);
                    }
                } catch (err) {
                    console.error('Failed to refresh token:', err);
                    logOut(); // Logout the user if refreshing the token fails
                }
            }
            logOut();
            return Promise.reject(error);

        }
        toast.error(`Error: ${error.message || 'An error occurred'}`);
        return Promise.reject(error);

    }
)

export default axiosInstance;
