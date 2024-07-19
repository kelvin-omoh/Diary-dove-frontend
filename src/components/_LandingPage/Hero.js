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
        <div className=' bg-[#DA9658] relative h-[610px] md:h-[1143px] mt-[3rem] md:mt-[5rem] text-white'>
            <div className=" md:block hidden bar absolute duration-300 top-[4rem] left-[20%]  bg-white w-[50em] h-[14em]">

            </div>
            <h1 className=' main text-[20px] md:text-[64px] text-white pt-[80px] font-[600] '>Take control of your day <br className=' hidden md:block' /> with <br className=' md:hidden block' /> DiaryDove</h1>
            <p className=' md:text-[18px] font-[400] mt-[16px]  text-[14px]'>Simplify your daily life and achieve your goals</p>
            <button onClick={() => navigate("/sign-up")} className=' py-[16px] bg-white text-[14px] md:text-[16px] rounded-lg mt-[32px] text-black px-[24px]'>
                Sign up for free
            </button>
            <img src={hero} className=' flex justify-center items-center mx-auto mt-[66px] md:mt-[88px] h-[283.95px] md:h-[652px] w-[259.4px] md:w-[727px]' alt="" />


            <div>
                <img src={vector} className=' absolute left-[-25px] md:left-[90%]   bottom-[504px] md:bottom-[206px]  h-[65px] md:h-[89px] ' alt="" />
                <img src={vector} className=' absolute right-[-20px] md:left-[-40px]  bottom-[200px] md:bottom-[53px]  h-[65px] md:h-[89px] ' alt="" />
                <img src={vector} className=' absolute left-[-25px] md:left-[80px]  bottom-[17px] md:bottom-[845px]   h-[65px] md:h-[89px] ' alt="" />
            </div>
        </div>
    )
}

export default Hero