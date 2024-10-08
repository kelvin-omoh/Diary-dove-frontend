import React from 'react'
// import Hero from '../components/_LandingPage/Hero'
// import Header from '../components/_LandingPage/Header'
import { AiOutlineArrowRight } from 'react-icons/ai'
import screen1 from '../assets/a1.png'
import screen2 from '../assets/a2.png'
import notifyIcon from '../assets/edit_notifications.png'
import emailIcon from '../assets/stacked_email (1).png'
import frame from '../assets/Frame (5).png'
import whatsapp from '../assets/chat.png'
import markunread from '../assets/mark_unread_chat_alt (1).png'
import note from '../assets/add_comment.png'
import search from '../assets/feature_search.png'
// import Footer from '../components/_LandingPage/Footer'
import { Navigate, useNavigate } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';
import Header from '../components/_LandingPage/New/Header'
import Hero from '../components/_LandingPage/New/Hero'
import s1 from '../assets/s1.png'
import s2 from '../assets/s-2.png'
import Footer from '../components/_LandingPage/New/Footer'
const LandingPage = () => {

    const howItWorks = [
        {
            img: notifyIcon,
            title: 'Set Reminder',
            description: 'Set reminders by clicking on the app you would like to be reminded with and verify your contact information for said application, then create multiple reminders with different convinient times that you will receive a message prompting you to take a break to write.'
        },
        {
            img: emailIcon,
            title: 'Email',
            description: 'Create a diary entry but sending a mail to us at dairydove@gmail.com with the mail subject set to daily diary entry or you can reply the reminder mail sent to you directly and get a confirmation message minute later showing successful entry.'
        },

        {
            img: whatsapp,
            title: 'Whatsapp',
            description: 'Send a message to our whatsapp bot with  daily dairy entry or start as a message prior to your actual diary entry and end when you have concluded writing.'
        },
        {
            img: markunread,
            title: 'Reply Reminders',
            description: 'Create new diary entries by clicking the create button and writing down what you would like to leave behind, you can also edit and delete from your dashboard here too.'
        },

        {
            img: note,
            title: 'Add New reminders',
            description: 'Add and delete reminders in your settings. You can also choose to change your remindering app here or switch off on of these apps(at least one of the apps must be on at all times)'
        },
        {
            img: search,
            title: 'Search',
            description: 'Our search allows you to filter through entries by date or a range of dates to visit your past self and see what you were thinking about.'
        },

    ]

    const navigate = useNavigate()

    return (
        <div className=' h-full pb-[4rem]    '>
            {/* <Header /> */}
            <Header />

            <Hero />
            <div id="services" className='   lg:px-[100px] bg-[#F1F2F3] flex flex-col gap-[40px] lg:gap-[118px] overflow-x-hidden md:pb-[40px] pb-[64px] md:px-[20px]  px-0  ' >


                <div

                    className='  justify-between flex  lg:flex-row flex-col lg:gap-y-[18px] h-full md:gap-4  gap-x-[24.5] lg:gap-x-[60px] pt-[64px] lg:pt-[40px] items-center text-start'>
                    <div className=' px-[48px] md:px-0 md:w-auto w-full'>
                        <img className=" h-full  object-contain  w-full md:w-[412px] lg:w-[512px] " src={s1} alt="" />
                    </div>
                    <div className='px-[24px]  text-center lg:text-start justify-center lg:px-0 w-full lg:w-[600px] '>
                        <h1 className=' font-[600] text-[20px] md:mt-0 mt-[60px] md:leading-[48px] leading-6 md:text-[30px] lg:text-[40px]'>Get reminded of your daily <br className=' md:hidden block lg:block' /> schedules effortlessly</h1>
                        <ul className=' text-[#8F96A3] list-disc  font-[400] md:text-[18px] md:leading-[27px] md:text-start leading-4 text-[12px] text-center mt-[16px]'>
                            <li>  Set reminders to let you know it's time your jot down your thoughts so far.</li>
                            <li>Be reminded to take a break and put down your thoughs through your email or whatsapp</li>
                            <li>create multiple reminders for different times through out the day.</li>
                        </ul>

                        <div className=' flex-1 '>
                            <a href={'#features'} className='  mt-[32px] w-[143px] md:w-[154px] mx-auto md:mx-0 mb-[24px] md:mb-0 bg-[#DA9658] flex items-center justify-center gap-[4px] text-white  rounded-lg px-[16px] py-[12px]'>Learn more <AiOutlineArrowRight className=' h-[17.66px] font-[400]' /> </a>
                        </div>

                    </div>

                </div>
                <div

                    className='  justify-between flex  lg:flex-row-reverse flex-col h-full  gap-x-[24.5] md:gap-x-[60px] pt-0 md:pt-[40px] items-center text-start'>
                    <div className=' px-[48px] md:px-0 md:w-auto w-full'>
                        <img className=" h-full  object-contain w-full md:w-[412px] lg:w-[512px] " src={s2} alt="" />
                    </div>
                    <div className='px-[24px]  text-center lg:text-start justify-center md:px-0 w-full lg:w-[600px] '>
                        <h1 className=' font-[600] text-[20px] md:mt-0 mt-[60px] md:leading-[48px] leading-6 md:text-[30px] lg:text-[40px]'>Easily create and edit your diary entries in seconds</h1>
                        <ul className=' text-[#8F96A3] list-disc  font-[400] md:text-[18px] md:leading-[27px] md:text-start leading-4 text-[12px] text-center mt-[16px]'>
                            Safe and secure space to be one with your thoughts not matter when , no matter where. Create multiple diaries entries throughout the day either with our website or by replying our reminders to you.
                        </ul>

                        <div className=' flex-1 flex justify-start'>
                            <a href={'#features'} className='  mt-[32px] w-[143px] md:w-[154px] mx-auto md:mx-0 mb-[24px] md:mb-0 bg-[#DA9658] flex items-center justify-center gap-[4px] text-white  rounded-lg px-[16px] py-[12px]'>Learn more <AiOutlineArrowRight className=' h-[17.66px] font-[400]' /> </a>
                        </div>

                    </div>

                </div>


            </div>
            <div id="features" className=' mt-[34px] md:mt-[100px] text-[24px] md:text-[40px] font-[600] px-[20px] lg:px-[100px] bg-[#ffffff] flex flex-col   ' >
                <h1 className=' text-center'>Features</h1>
                <div className=' mt-[18px] grid-cols-1  gap-[20px]  grid md:grid-cols-2 lg:grid-cols-3 md:mt-[40px] '>
                    {howItWorks.map((item) => (
                        <div key={item.description} className=' rounded-[8px] bg-[#FDFAF7] text-center justify-center items-center flex flex-col py-[12px] md:py-[40px] px-[32px] '>
                            <img src={item.img} alt={item.title} className=' size-[48px] object-contain object-center ' />
                            <h1 className=' font-[600] mt-[16px] mb-[8px] text-[20px]'>{item.title}</h1>
                            <p className=' text-[#8F96A3] text-[14px] md:text-[16px] font-[400] '>{item.description}</p>
                        </div>

                    ))}


                </div>
            </div>

            <div className=' bg-[#F1F2F3] relative rounded-[8px] pb-[51px] pt-[81px] md:py-[51px] text-center flex flex-col justify-center items-center my-[40px] mx-0 lg:m-[100px]'>
                <h1 className='text-[24px] md:text-[40px] font-[500] mb-[8px] '>Seamlessly capture your <span className=' text-[#DA9658]'>
                    thoughts</span> </h1>
                <p className=' text-[14ppx] md:text-[16px] text-[#8F96A3]'>Accessible anytime through Email and WhatsApp</p>
                <button onClick={() => navigate("/sign-up")} className=' bg-[#FFFFFF] relative z-10 px-[32px] py-[8px] rounded-[8px] mt-[40px] '>Sign up for free</button>
                <img src={frame} alt={'Background'} className=' h-[217px] w-[260px]  absolute top-[31px] md:top-[31px]' />

            </div>



            <Footer />


        </div>
    )
}

export default LandingPage