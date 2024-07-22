import React, { useEffect, useState, useRef } from 'react';
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
    const focusedLinkRef = useRef(null);
    const navigate = useNavigate();

    const links = [
        { name: 'Services', path: '/' },
        { name: 'How it works', path: '/se ' },
        { name: 'Contact Us', path: '/footer' },
    ];



    const handleToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (focusedLinkRef.current) {
            focusedLinkRef.current.focus();
            focusedLinkRef.current = null; // Reset the ref after focusing
        }
    }, [focusedLinkRef]);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = -90; // Adjust this value for your desired offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset + offset;
            smoothScrollTo(offsetPosition);
            setIsMobileMenuOpen(false); // Close the menu after clicking a link

            // Focus on the link after scrolling
            focusedLinkRef.current = id;
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

    return (
        <div className='z-10 fixed top-0 w-[100vw] flex flex-row items-center py-[16px] justify-between px-[24px] md:px-[80px] bg-white'>
            <div>
                <img src={logo} alt='logo' className='h-[36px]' />
            </div>
            <button onClick={handleToggle} className=' font-[100]  md:hidden'>
                {isMobileMenuOpen ? <LiaTimesSolid size={30} /> : <HiBars3 size={30} />}
            </button>
            <div className='hidden md:flex items-center justify-center'>
                <ul className='flex gap-[56px] items-center'>
                    {links.map((link) => (
                        <li key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                            <Link to={link.path} className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]' >{link.name}</Link>

                        </li>
                    ))}
                </ul>
                <div className='flex gap-[16px]  items-center ml-[64px]'>
                    <button onClick={() => navigate("/login")} className='rounded-lg w-[158px] border border-[#F1F2F3] px-[24px] py-[8px]'>sign In</button>
                    <button onClick={() => navigate("/sign-up")} className='bg-[#DA9658] text-white rounded-lg px-[24px] py-[8px]'>Sign up for free</button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden flex-col z-[50] py-[30px] absolute top-[65px] left-0 text-white w-full flex items-center justify-center transition-all bg-black/80 backdrop-blur-sm duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <ul className='flex flex-col z-[50] relative justify-center gap-[20px] items-center'>
                    {links.map((link) => (
                        <li key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                            <Link to={link.path} scroll={customScroll} className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]'>
                                {link.name}
                            </Link>

                        </li>
                    ))}
                </ul>
                <div className='flex flex-col z-[50] relative gap-[20px] mt-[24px] justify-center items-center'>
                    <button onClick={() => navigate("/login")} className='border z-[50] relative hover:bg-[#f39844] hover:border-none ease-in transition-all duration-150 text-white rounded-lg px-[24px] py-[8px] w-full '>Sign In</button>
                    <button onClick={() => navigate("/sign-up")} className='bg-[#DA9658] z-[50] relative  hover:bg-[#f39844] hover:border-yellow-20ease-in transition-all duration-150 text-white rounded-lg px-[24px] py-[8px] w-full
                    '>Sign up for free</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
