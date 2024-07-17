import { useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const useCheckToken = () => {
    const { userInfo, logOut, setAuthInfo } = useContext(Usercontext);
    const navigate = useNavigate()
    const getUserData = async () => {
        try {
            const response = await axios.get('api/users/personalinfo', {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            const newData = response.data.data
            const updatedData = { ...userInfo };

            newData.forEach(item => {
                const [key] = Object.keys(item);
                const [value] = Object.values(item);
                if (!(key in updatedData)) {
                    updatedData[key] = value;
                }
            });
            setAuthInfo(updatedData)
        } catch (error) {
            toast.error('Error while getting user information');
            console.log(error);
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                if (userInfo.token) {
                    const response = await axios.get('api/users/protected', {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response.data);

                    if (response.data.status === 'success') {
                        getUserData();
                    } else {
                        navigate("/login")
                    }

                } else {
                    navigate("/login")
                    logOut();
                }
            } catch (error) {
                navigate("/login")
                console.log(error);
                // Adjust to handle token expiration/error  
                toast.error("Token expired or invalid");
                logOut();
            }
        };

        checkToken();
    }, [userInfo.token, getUserData, logOut]);

    return userInfo.token;
};

export default useCheckToken;
