// useCheckToken.js
import { useContext } from 'react';
import { Usercontext } from '../../context/userContext';

const useCheckToken = () => {
    const { userInfo } = useContext(Usercontext);
    return userInfo?.token; // Ensure 'token' is the key used in your context
};

export default useCheckToken;
