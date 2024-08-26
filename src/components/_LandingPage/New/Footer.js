import React from 'react'
import frame from '../../../assets/Frame (5).png'
import logo from '../../../assets/Frame 35238.png'
import { AiOutlineCopyright } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';
const Footer = () => {
    const navigate = useNavigate()
    return (
        <div id='footer' className='  relative     w-full '>
            <div className='  bg-[#1c1b1f]  pb-[24px] w-full    absolute top-[100%]     text-white rounded-t-[30px] '>
                {/* <div className=' flex justify-center items-center flex-col '>
                    <h1 className=' mx-auto   z-[4] relative  text-[20px] md:text-[40px] font-[500] '>Seamlessly capture your <span className=' text-[#DA9658]'> thoughts</span></h1>
                    <p className=' mt-[8px] md:text-[16px] text-[#E9EAED] text-[12px] z-[4] relative'>Accessible anytime through Email and WhatsApp</p>
                    <button onClick={() => navigate("/sign-up")} className=' px-[32px] mb-[32px] md:mb-[114px] relative z-[4] py-[12px] mt-[40px] bg-white rounded-lg text-black text-[18px]'>Sign up for free</button>
                </div> */}

                <div className='  px-[24px] md:px-[80px]   flex flex-col md:flex-row justify-between   w-full md:w-[100vw]  py-[24px] '>
                    <div className=' mb-[20px] md:block grid items-center justify-center  md:mb-0 flex-1'>
                        <img src={logo} alt=" logo" className=' h-[36px] ' />
                    </div>
                    <div className=' flex gap-[50px] md:gap-[94px]  text-[14px] flex-row justify-between   text-start items-start '>
                        <div className=' text-[14px] '>
                            <ul className='  grid gap-[16px] '>
                                <li className=' text-white font-[700] '>Services</li>
                                <li className='text-[#8F96A3]'>User Account</li>
                                <li className='text-[#8F96A3]'>Reminders</li>
                            </ul>
                        </div>
                        <div className=' text-[14px] '>
                            <ul className='  grid gap-[16px] '>
                                <li className=' text-white font-[700] capitalize '>contact us</li>
                                <li className='text-[#8F96A3] capitalize'>Be free to get in touch with us</li>
                                <li className='text-[#8F96A3] capitalize'>Nigeria: +234 (803) 854 1242</li>
                                <li className='text-[#8F96A3] '>contanctus: infodiarydove@gmail.com</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className=' flex flex-col md:flex-row text-[12px] md:text-[14px] items-center    w-full pt-[25.5px] justify-center md:justify-between px-[24px] border-t-[1px] border-t-[#4C4B53] md:px-[80px]'>
                    <ul className=' md:mx-0 mx-auto  flex gap-[8px] md:gap-[56px]'>
                        <li>Terms of Service</li>
                        <Link to={'/privacy-policy'}
                        >Privacy policy</Link>
                        <li>Cookies policy</li>
                    </ul>
                    <ul className=' md:mx-0 mx-auto md:block flex justify-center md:w-auto w-full'>
                        <li className=' text-[#B4B9C2] flex md:mt-[0px] mt-[16px] gap-3 items-center'> <AiOutlineCopyright size={24} /> 2024 All right reserved</li>
                    </ul>

                </div>

            </div>







        </div>
    )
}

export default Footer