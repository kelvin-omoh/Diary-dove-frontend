import React from 'react';
import logo from '../../assets/DiaraDove Logo.png';
import notification from '../../assets/Notification 2.png';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='shadow-lg w-full z-10 fixed px-[80px] top-0 py-[26px] flex justify-between items-center h-[88px] bg-white'>
            <Link to="/">
                <img src={logo} className='h-[36px]' alt='' />
            </Link>
            <div className='grid grid-cols-2 gap-[16px] items-center place-content-center'>
                <img src={notification} className='h-[23px]' alt='' />
                <FaUserCircle className='text-gray-500 size-[40px]' />
            </div>
        </div>
    );
};

export default Header;
