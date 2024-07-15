import React, { useContext } from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'
import { Usercontext } from '../../context/userContext';

const Sidebar = () => {
    const links = [
        {
            text: "User Account",
            route: "/settings"
        },
        {
            text: "Reminder",
            route: "/settings/reminder"
        },

    ]
    const location = useLocation();
    const { userInfo, logOut } = useContext(Usercontext)
    return (
        <div className=' z-[100] fixed h-full top-[88px] left-0 shadow-xl w-[320px] text-center'>
            <h1 className=' mt-[32px] leading-[48px] text-[32px] font-[600]'>Settings</h1>
            <ul className=' mt-[48px] flex flex-col items-center justify-center gap-[18px]'>
                {links.map(link => (
                    <li key={link.route} className={`${location.pathname === link.route ? 'border-r-4 border-[#DA9658]' : ''} h-[72px] items-center flex justify-center text-[24px] w-full`}>
                        <Link to={link.route}>{link.text}</Link>
                    </li>
                ))}
                <li onClick={() => logOut()} className=' cursor-pointer h-[72px] mt-[40vh] mb-[48px] gap-[8px] items-center flex justify-center text-[14px] font-[600]  w-full ' >
                    <FaSignOutAlt className=' text-[#b3b3b3] size-[24px]' />
                    Logout
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
