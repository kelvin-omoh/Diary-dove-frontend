import React, { useContext } from 'react';
import logo from '../../assets/DiaraDove Logo.png';
import logout from '../../assets/Logout 2.png';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Usercontext } from '../../context/userContext';

const Header = () => {
    const { userInfo, logOut } = useContext(Usercontext)
    return (

        <div className='  rounded-none md:rounded-tl-[48px] fixed w-full md:w-[80vw]  bg-white px-[24px] md:px-[80px] top-[0px] py-[26px] flex justify-between  shadow-md shadow-[#f1f1f1e1] items-center h-[88px] '>
            <Link to="/dashboard">
                <img src={logo} className='h-[36px] pl-0 md:pl-[0px]' alt='' />

            </Link>
            <div className='grid grid-cols-2 gap-[16px] items-center place-content-center'>
                <img onClick={() => logOut()} src={logout} className=' cursor-pointer h-[19.5px]' alt='' />

                {userInfo?.profilePicture ?
                    <img src={userInfo?.profilePicture} className=' rounded-full size-[40px]' alt='' />
                    :
                    <FaUserCircle className='text-gray-500 size-[40px]' />
                }



            </div>
        </div>
    );
};

export default Header;
