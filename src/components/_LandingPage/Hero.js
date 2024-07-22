import React, { useEffect } from 'react'
import hero from '../../assets/hero.png'
import vector from '../../assets/Vector (4).png'
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    useEffect(() => {
        gsap.to('.bar', { x: 0, width: 0, duration: ".2", ease: 'power1' })
        gsap.to('.main', { ease: 'power1' })
    }, [])
    const navigate = useNavigate()
    return (
        <div className=' bg-[#DA9658] relative h-[570px]  md:h-[1108px]   text-white'>
            <div className=" md:block hidden bar  duration-300    bg-white ">

            </div>
            <div className=' grid gap-8  justify-center items-center text-center'>
                <div className='grid gap-4'><h1 className=' main text-[20px] md:text-[64px] text-white pt-[80px] font-[600] '>Take control of your day <br className=' hidden md:block' /> with <br className=' md:hidden block' /> DiaryDove</h1>
            <p className=' md:text-[18px] font-[400]   text-[14px]'>Simplify your daily life and achieve your goals</p></div>
                
           <div className=' w-full  items-center justify-center'><button onClick={() => navigate("/sign-up")} className='  bg-white text-[14px] md:text-[16px] rounded-lg  text-black px-4 py-2'>
                Sign up for free
            </button></div> 
            </div>
            
            <img src={hero} className=' absolute top-[284px] left-[50px] md:top-[456px]   md:left-[357px] h-[261px] md:h-[652px] w-[291x] md:w-[727px]' alt="" />


            <div>
                <img src={vector} className=' absolute  top-[34px] md:top-[157px] md:left-[80px] left-[-33px]  h-[69px] md:w-[130px] md:h-[106px]  ' alt="" />
                <img src={vector} className=' absolute left-[338px] md:left-[1230px] top-[291px] md:top-[796px md:w-[130px] md:h-[106px] w-[84px]  h-[69px]  ' alt="" />
                <img src={vector} className=' absolute top-[434px] md:top-[949px] left-[-42px] md:left-[-65px]  w-[84px] h-[69px] md:w-[130px] md:h-[106px]  ' alt="" />
            </div>
        </div>
    )
}

export default Hero