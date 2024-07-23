import React, { useEffect } from 'react'
import logo from '../assets/DiaraDove Logo.png'
import Bell from '../assets/Notification 2.png'
import { BsBellSlash, BsX } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai'
import Drawer from '@mui/material/Drawer';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from 'react-router-dom'

export const LogoFunction = () => {
    return (
        <div className=' flex flex-col'>
            <img className=' logo  w-[146px] h-[36px]' src={logo} alt={'logo'} />
        </div>
    )
}


const Header = () => {
    const [openNotification, setOpenNotification] = React.useState(false);
    const navigate = useNavigate()
    const toggleDrawer = (newOpen) => () => {
        setOpenNotification(newOpen);
    };
    useEffect(() => {
        // Scroll the page to top when the component mounts
        window.scrollTo(0, 0);
    }, []);



    const DrawerList = (
        <div className=' px-0 md:px-[1rem] w-[20vw]'>
            <button onClick={() => setOpenNotification(!openNotification)} className='mt-[2rem] mb-[3rem] float-end'>
                <BsX size={30} />
            </button>
            <div className=' mt-[3rem] w-full  text-start'>
                <p className=' text-center flex gap-3 mx-auto justify-center text-[20px] text-gray-500 mt-[30rem]'> No  notications  <BsBellSlash /> </p>
            </div>

        </div>
    );


    useGSAP(() => {
        gsap.from('.logo', {

            x: '-120',
            delay: .4,
            stagger: 0.25

        })
        gsap.from('.nav', {
            opacity: 1,
            y: -120,
            x: '0',


        })
        gsap.to('.nav', {
            opacity: 1,
            y: 0,
            x: '0',
            delay: .4,
            stagger: 0.25

        })
        gsap.to('.logo', {
            opacity: 1,
            y: 0,
            x: '0',
            delay: .4,
            stagger: 0.25

        })
        gsap.from('.logo', {
            opacity: 0,
        })
    }, [])


    return (
        <>
            <div className=' nav fixed top-0 left-0 w-full z-[100]     border-b-[1px] bg-white border-[#E5E5E5]  flex justify-between   px-[24px] md:px-[80px] py-[18px]  '>

                {LogoFunction()}


                <div className=' flex items-center gap-[19.8px]'>

                    <button onClick={toggleDrawer(true)}>
                    </button>
                    <AiFillSetting onClick={() => navigate("/settings")}  className='text-[#B4B9C2] hover:cursor-pointer hover:text-[#DA9658] ' size={20} />
                </div>
            </div>
            <Drawer anchor={'right'} open={openNotification} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default Header