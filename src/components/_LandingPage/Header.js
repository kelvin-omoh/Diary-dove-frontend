import React, { useState } from 'react';
import logo from '../../assets/DiaraDove Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: 'Services', path: '/' },
        { name: 'How it works',  path:'/se ' },
        { name: 'Contact Us', path: '/footer' },
    ];

    const handleToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = -90; // Adjust this value for your desired offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset + offset;
            smoothScrollTo(offsetPosition);
            setIsMobileMenuOpen(false); // Close the menu after clicking a link
        }
    };

    const smoothScrollTo = (targetPosition) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 200; // Duration in milliseconds
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const navigate = useNavigate();

    return (
        <div className='z-10 fixed top-0 w-[100vw] flex flex-row items-center py-[16px] justify-between px-[24px] md:px-[80px] bg-white'>
            <div>
                <img src={logo} alt='logo' className='h-[36px]' />
            </div>
            <button onClick={handleToggle} className='md:hidden'>
                {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
            <div className='hidden md:flex items-center justify-center'>
                <ul className='flex gap-[56px] items-center'>
                    {links.map(link => (
                        <li key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                            <Link to={link.path}  className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]' >{link.name}</Link>
                            
                        </li>
                    ))}
                </ul>
                <div className='flex gap-[16px] items-center ml-[64px]'>
                    <button onClick={() => navigate("/login")} className='rounded-lg border border-[#F1F2F3] px-[24px] py-[8px]'>Sign In</button>
                    <button onClick={() => navigate("/sign-up")} className='bg-[#DA9658] text-white rounded-lg px-[24px] py-[8px]'>Sign up for free</button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden flex-col z-[50] py-[30px] absolute top-[65px] left-0 text-white w-full flex items-center justify-center transition-all bg-black/80 backdrop-blur-sm duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <ul className='flex flex-col z-[50] relative justify-center gap-[20px] items-center'>
                    {links.map(link => (
                        <li key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                            <Link to={link.path} className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]'>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='flex flex-col z-[50] relative gap-[20px] mt-[24px] justify-center items-center'>
                    <button onClick={() => navigate("/login")} className='rounded-lg border z-[50] relative hover:bg-[#8c6138] ease-in transition-all duration-150 border-[#F1F2F3] px-[24px] py-[8px]'>Sign In</button>
                    <button onClick={() => navigate("/sign-up")} className='bg-[#DA9658] z-[50] relative hover:bg-[#8c6138] ease-in transition-all duration-150 text-white rounded-lg px-[24px] py-[8px]'>Sign up for free</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
