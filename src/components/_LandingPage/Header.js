import React, { useState } from 'react';
import logo from '../../assets/DiaraDove Logo.png';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";


const customScroll = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -52;
    const targetPosition = yCoordinate + yOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 80; // Duration of the scroll in milliseconds
    let startTime = null;

    const scroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Ensure the progress doesn't exceed 1

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(scroll);
        }
    };

    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    requestAnimationFrame(scroll);
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        // { name: 'Services', path: '/#services' },
        { name: 'Features', path: '/#features' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const handleToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    const navigate = useNavigate()
    return (
        <div style={{ boxShadow: '0px 0px 12px 0px #00000014' }} className='z-10  fixed top-0 w-[100vw] flex flex-row items-center py-[16px] justify-start lg:justify-between px-[24px] lg:px-[80px] bg-white'>
            <div className='hidden lg:block'>
                <img onClick={() => navigate('/')} src={logo} alt='logo' className=' cursor-pointer h-[36px]' />
            </div>
            <button onClick={handleToggle} className='font-[100] lg:hidden'>
                {isMobileMenuOpen ? <LiaTimesSolid size={30} /> : <HiBars3 size={30} />}
            </button>
            <div className='mx-auto lg:hidden block'>
                <img src={logo} alt='logo' className=' cursor-pointer h-[36px]' />
            </div>
            <ul className='hidden lg:flex gap-x-[80px] items-center'>
                <div className='hidden lg:flex gap-x-[56px] items-center'>
                    {links.map(link => (
                        <li key={link.name} >
                            <a href={link.path} className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]'>{link.name}</a>
                        </li>
                    ))}
                </div>


                <div className='hidden lg:flex items-center justify-center'>
                    <div className='flex gap-[16px] items-center ml-[64px]'>
                        <button onClick={() => navigate('/login')} className='rounded-lg border border-[#F1F2F3] px-[24px] py-[8px]'>Sign In</button>
                        <button onClick={() => navigate('/sign-up')} className='bg-[#DA9658] text-white rounded-lg px-[24px] py-[8px]'>Sign up for free</button>
                    </div>
                </div>
            </ul>


            {/* Mobile menu */}
            <div className={`lg:hidden flex-col z-[50] py-[30px] absolute top-[65px] left-0 text-white w-full flex items-center justify-center transition-all bg-black/80 backdrop-blur-sm duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <ul className='flex flex-col z-[50] relative justify-center gap-[20px] items-center'>
                    {links.map(link => (
                        <li key={link.name} >
                            <a href={link.path} className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]'>{link.name}</a>
                        </li>
                    ))}
                </ul>
                <div className='flex flex-col z-[50] relative gap-[20px] mt-[24px] justify-center items-center'>
                    <button onClick={() => navigate('/login')} className='rounded-lg border z-[50] relative hover:bg-[#8c6138] ease-in transition-all w-full duration-150 border-[#F1F2F3] px-[24px] py-[8px]'>Sign In</button>
                    <button onClick={() => navigate('/sign-up')} className='bg-[#DA9658] z-[50] relative hover:bg-[#8c6138] ease-in transition-all duration-150 text-white rounded-lg px-[24px] py-[8px]'>Sign up for free</button>
                </div>
            </div>
        </div>
    );
};


export default Header