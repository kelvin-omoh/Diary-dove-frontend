// Sidebar.js
import React, { useContext } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Usercontext } from '../../context/userContext';
import { ToggleContext } from '../../context/toggleContext';
import user from '../../assets/Vector.png';
import close from '../../assets/Close Square.png';
import vector from '../../assets/Vector (4).png';
import notification from '../../assets/Notification 2a 2.png';
import logoutIcon from '../../assets/logout2.png';
import { IoNotificationsOutline } from "react-icons/io5";
import { PiUserRectangle } from 'react-icons/pi';

const Sidebar = () => {
    const links = [
        {
            text: "User Account",
            icon: PiUserRectangle,
            route: "/settings"
        },
        {
            text: "Reminder",
            icon: IoNotificationsOutline,
            route: "/settings/reminder"
        },
    ];

    const location = useLocation();
    const { userInfo, logOut } = useContext(Usercontext);
    const { toggle, handleToggle } = useContext(ToggleContext);

    return (
        <>
            {toggle && <div onClick={() => handleToggle(!toggle)} className='z-[100] block md:hidden fixed bg-[#000000B2] w-full h-full'></div>}
            <div className={` ${toggle ? ' left-0 opacity-[1] ' : ' left-[-100vw] '}  md:opacity-[1] z-[100] ease-in-out  duration-300  opacity-0 transition-all bg-[#DA9658] text-white text-start flex justify-start flex-col md:left-0 fixed h-[100vh] top-0 shadow-xl w-[226px] md:w-full pl-[24px] md:pl-[80px]`}>
                <div className={` ${toggle ? ' left-0 opacity-[1] ' : ' left-[-100vw] '}  md:opacity-[1] z-[100] ease-in-out  duration-300  opacity-0 transition-all  text-white text-start flex justify-start flex-col md:left-0 fixed h-[100vh] top-0 shadow-sm w-[226px] md:w-[320px] pl-[24px] md:pl-[80px]`}>
                    <div className='mt-[42px] flex justify-between w-full pr-[17.8px] items-center'>
                        <h1 className='text-[20px] md:text-[32px] font-[600]'>Settings</h1>
                        <button onClick={() => handleToggle(!toggle)} className='block md:hidden'>
                            <img className='size-[20px]' src={close} alt='close' />
                        </button>
                    </div>
                    <ul className='mt-[48px] flex flex-col items-center justify-center gap-[24px]'>
                        {links.map(link => (
                            <li onClick={() => handleToggle(!toggle)} key={link.route} className={` ${location.pathname === link.route ? 'bg-white text-[#DA9658]' : ''} h-[48px] rounded-l-[128px] py-[8px] md:py-[11px] md:pl-[27px] pl-[16px] text-[14px] md:text-[18px] items-center flex w-full`}>
                                <Link className='flex gap-[8px] md:gap-[19px] items-center font-[500]' to={link.route}>
                                    <link.icon
                                        className=' rounded-md font-[500] size-[24px] md:size-[32px] object-contain' alt={link.text} />
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-[160px] md:mt-[173px] w-[321px-80px]  flex justify-end pr-[-3rem] md:pr-[9px]'>
                        <img src={vector} className='h-[89px] ml-[10rem]' alt="" />
                        <div className='absolute bottom-[24px] md:bottom-[-40px] left-[24px]'>
                            <div className='md:hidden mr-[24px] flex items-center gap-3'>
                                {userInfo?.profilePicture ?
                                    <img src={userInfo?.profilePicture} className='rounded-full size-[40px]' alt='Profile' /> :
                                    <FaUserCircle className='text-gray-500 size-[40px]' />
                                }
                                <div className='block md:hidden text-white font-[600] text-[14px]'>
                                    <h1>Precious A.</h1>
                                    <p>Welcome!</p>
                                </div>
                            </div>
                            <button onClick={() => logOut()} className='md:hidden text-[18px] font-[500] flex items-center gap-[14.25px] mb-[17.25px] mt-[25.5px]'>
                                <img src={logoutIcon} className='cursor-pointer h-[24px]' alt='Log out' />
                                Log out
                            </button>
                            <img className='absolute md:relative md:bottom-0 bottom-[-100px] left-[-57px] h-[89px]' src={vector} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
