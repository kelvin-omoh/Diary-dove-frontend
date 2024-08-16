import axios from 'axios';
import React from 'react'
import axiosInstance from '../Utils/axiosInstance';
const ChangePassword = () => {
    const savePreferences = async () => {


        const token = extractToken(userInfo.token); // Ensure the token is properly extracted
        console.log('Extracted Token:', token); // Log the token for debugging

        try {
            const res = await axiosInstance.post('api/users/newpassword', {

                oldpassword: "oldPassword123",
                password: "newPassword456"

            }, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            toast.success('Password successfully changed');
            navigate('/diary')
        } catch (error) {
            console.log(error.response);
            if (error.response?.status === 401) {
                // Handle unauthorized (token expired) error
                logOut(); // Call logout function if token expires
                toast.error('Old password invalid'); // Show user a message
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };
    const newPassword = async () => {


        const token = extractToken(userInfo.token); // Ensure the token is properly extracted
        console.log('Extracted Token:', token); // Log the token for debugging

        try {
            const res = await axiosInstance.post('api/users/newpassword', {


                email: "elusamisegun6@gmail.com",
                password: "newPassword123"


            }, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            toast.success('Password successfully changed');
            navigate('/diary')
        } catch (error) {
            console.log(error.response);
            if (error.response?.status === 401) {
                // Handle unauthorized (token expired) error
                logOut(); // Call logout function if token expires
                toast.error('Old password invalid'); // Show user a message
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };


    const changePhoneNumber = () => {
        const savePerference = async () => {
            const token = extractToken(userInfo.token)
            console.log('extracted user token', token);
            try {
                const req = axiosInstance.post('api/users/personalinfo',
                    {
                        fullname: "New Name",
                        username: "Newname",
                        phonenumber: "+1234567890"
                    }, {
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json'
                    }
                })
            } catch (error) {
                console.log(error.response)
                if (error.response?.status === 401) {

                    toast.error('You have access to this protected route'); // Show user a message
                } else {
                    toast.error(error.response?.data?.message || 'An error occurred');
                }

            }
        }

    }
    const accessProtectedRoutes = () => {
        const savePerference = async () => {
            const token = extractToken(userinfo.token);
            try {
                const req = axiosInstance.post('api/users/protected')
            } catch (error) {
                console.log(error.response)
                if (error.response?.status === 401) {

                    toast.error('Invalid or missing token'); // Show user a message
                } else {
                    toast.error(error.response?.data?.message || 'An error occurred');
                }

            }
        }
    }


}


return (
    <div>
        <h2>Change password  </h2>

        <p></p>
        <p> snippet to bring out html tags and boilerplate in vs code</p>

    </div>
)


export default chngpass