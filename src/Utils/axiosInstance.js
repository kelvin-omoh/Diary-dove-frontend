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
    localStorage.removeItem('whatsapp');
    localStorage.removeItem('timer');
    // Optional: If using React Router, you might want to use history to redirect
    window.location.href = '/'; // Redirect to login page
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
                    toast.error('token expired')
                    logOut(); // Logout the user if refreshing the token fails
                }
            }
            logOut();
            return Promise.reject(error);

        }
        if (error.response.status === 403) {
            console.log(error.response.data.message);

            toast.error(error.response.data.message)
            // logOut();
        } else {

        }
        // toast.error(`Error: ${error.message || 'An error occurred'}`);
        // logOut();
        return Promise.reject(error);

    }
)

export default axiosInstance;
