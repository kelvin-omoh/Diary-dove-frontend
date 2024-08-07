import React, { useState } from 'react';
import logo from '../../../assets/DiaraDove Logo.png';
import { HiBars3 } from 'react-icons/hi2';
import { LiaTimesSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: 'Services', path: '/#services' },
        { name: 'How it works', path: '/#how-it-works' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const handleToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // const handleScroll = (path) => {
    //     const section = document.querySelector(path);
    //     if (section) {
    //         section.scrollIntoView({ behavior: 'smooth' });
    //     }
    //     setIsMobileMenuOpen(false);
    // };

    const navigate = useNavigate()
    return (
        <div className='z-10 fixed top-0 w-[100vw] flex flex-row items-center py-[16px] justify-start md:justify-between px-[24px] md:px-[80px] bg-white'>
            <div className='hidden md:block'>
                <img src={logo} alt='logo' className='h-[36px]' />
            </div>
            <button onClick={handleToggle} className='font-[100] md:hidden'>
                {isMobileMenuOpen ? <LiaTimesSolid size={30} /> : <HiBars3 size={30} />}
            </button>
            <div className='mx-auto md:hidden block'>
                <img src={logo} alt='logo' className='h-[36px]' />
            </div>
            <ul className='hidden md:flex gap-x-[56px] items-center'>
                {links.map(link => (
                    <li key={link.name} >
                        <a href={link.path} className='ease-in z-[50] relative transition-all duration-150 hover:text-[#dd9a5b]'>{link.name}</a>
                    </li>
                ))}
            </ul>
            <div className='hidden md:flex items-center justify-center'>
                <div className='flex gap-[16px] items-center ml-[64px]'>
                    <button onClick={() => navigate('/login')} className='rounded-lg border border-[#F1F2F3] px-[24px] py-[8px]'>Sign In</button>
                    <button onClick={() => navigate('/sign-up')} className='bg-[#DA9658] text-white rounded-lg px-[24px] py-[8px]'>Sign up for free</button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden flex-col z-[50] py-[30px] absolute top-[65px] left-0 text-white w-full flex items-center justify-center transition-all bg-black/80 backdrop-blur-sm duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
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