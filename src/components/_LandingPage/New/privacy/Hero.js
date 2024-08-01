import React from 'react'
import hero from '../../../../assets/hero2.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className=' bg-[#FDFAF7] h-[90vh]  overflow-hidden   overflow-x-hidden relative  flex flex-col  px-[10px] md:px-[120px]   md:flex-col items-center gap-0 md:gap-[30px]  mt-[43px]'>
            <div className='  w-[644px] mt-[160px] text-center'>
                <h1 className=' text-[24px] md:text-[54px] font-[500] leading-[28.8px] md:leading-[64.8px]  text-[#303236]'>Privacy Policy</h1>

            </div>
            <div>
                <img className=' size-auto absolute bottom-[-65px] left-[35%]  md:size-[500px] object-cover object-center' src={hero} alt="" />
            </div>

        </div>
    )
}

export default Hero