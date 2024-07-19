import { useEffect, useContext, useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Usercontext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const useCheckToken = () => {
    const { userInfo, logOut, setAuthInfo } = useContext(Usercontext);
    const navigate = useNavigate();

    const token = useMemo(() => userInfo?.token, [userInfo]);

    const getUserData = useCallback(async () => {
        try {
            const response = await axios.get('/api/users/personalinfo', {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                },
            });
            const newData = response.data.data;
            const updatedData = { ...userInfo };

            newData.forEach((item) => {
                const [key] = Object.keys(item);
                const [value] = Object.values(item);
                if (!(key in updatedData)) {
                    updatedData[key] = value;
                }
            });
            setAuthInfo(updatedData);
        } catch (error) {
            toast.error('Error while getting user information');
            console.error('getUserData error:', error);
        }
    }, [token, userInfo, setAuthInfo]);

    const checkToken = useCallback(async (cancelToken) => {
        try {
            if (token) {
                const response = await axios.get('/api/users/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    cancelToken,
                });

                if (response.data.status === 'success') {
                    getUserData();
                } else {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.error('checkToken error:', error);
                if (error.response && error.response.status === 401) {
                    toast.error('Token expired or invalid');
                } else {
                    toast.error('Failed to authenticate');
                }
                logOut();
            }
        }
    }, [token]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        checkToken(source.token);

        return () => {
            source.cancel('Component unmounted or effect cleanup');
        };
    }, [checkToken]);

    return token;
};

export default useCheckToken;
