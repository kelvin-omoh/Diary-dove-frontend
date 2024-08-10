import React from 'react'
import hero from '../../../assets/hero2.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className=' overflow-x-hidden relative  flex flex-col  px-[10px] lg:px-[120px]  md:flex-row items-center justify-center gap-0 md:gap-[56px] pt-[4.4rem] mt-[43px]'>
            <div className='  w-[644px] text-center'>
                <h1 className=' text-[24px] md:text-[54px] font-[500] leading-[28.8px] md:leading-[64.8px]  text-[#303236]'>Take control of your day with <br className=' md:hidden block' /> DiaryDove</h1>
                <p className=' mt-[8px] text-[#8F96A3] text-[14px] leading-[21px] md:leading-[27px] md:text-[18px]'>Simplify your daily life and achieve your goals</p>
                <button onClick={() => navigate('/sign-up')} className=' bg-[#B4B9C2] text-white py-[8px] px-[32px] rounded-[8px] mt-[32px]'>Sign up for free</button>
            </div>
            <div>
                <img className=' size-auto md:size-[500px] object-cover object-center' src={hero} alt="" />
            </div>

        </div>
    )
}

export default Hero