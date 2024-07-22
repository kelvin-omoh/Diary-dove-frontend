import React from 'react'
import Hero from '../components/_LandingPage/Hero'
import Header from '../components/_LandingPage/Header'
import { AiOutlineArrowRight } from 'react-icons/ai'
import screen1 from '../assets/a1.png'
import screen2 from '../assets/a2.png'
import clock from '../assets/clock-dynamic-color.png'
import emailIcon from '../assets/mail-dynamic-color.png'
import whatsapp from '../assets/Whatsapp.png'
import chat from '../assets/chat-text-dynamic-color.png'
import note from '../assets/notebook-dynamic-color.png'
import search from '../assets/zoom-dynamic-color.png'
import Footer from '../components/_LandingPage/Footer'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const howItWorks = [
        {
            img: clock,
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
            img: chat,
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
        <div className='bg-gradient-to-t h-full   from-[#FAF2EA] ] to-[#fff9f3] '>
            <Header />
            <Hero />
            <section className='   px-0 md:px-[80px] ' >
                <section className='  mb-[56px]'>


                    <div id='services' className='  justify-between flex md:flex-row flex-col h-full  gap-[24.5] md:gap-[163px] pt-[56px] items-center text-start'>
                        <div className='px-[24px]  text-center justify-center md:px-0 w-full md:w-[753px] '>
                            <h1 className=' font-[600] text-[20px] md:leading-[48px] leading-6 md:text-[40px]'>Get reminded of your daily <br /> schedules effortlessly</h1>
                            <p className=' text-[#8F96A3] font-[400] md:text-[18px] md:leading-[27px] md:text-start leading-4 text-[12px] text-center mt-[16px]'>Set reminders to let you know it's time your jot down your thoughts so far. <br />
                                Be reminded to take a break and put down your thoughs through your email or whatsapp and create multiple reminders for different times through out the day. </p>
                            <button onClick={() => navigate("#howitworks")} className=' mt-[32px] mx-auto md:mx-0 mb-[24px] md:mb-0 bg-[#DA9658] flex items-center justify-center gap-[4px] text-white  rounded-lg px-[16px] py-[16px]'>Learn more <AiOutlineArrowRight className=' h-[17.66px] font-[400]' /> </button>
                        </div>
                        <div className='bg-gradient-to-t px-[48px] md:px-0 from-[#FAF2EA] ] to-[#fff9f3] md:w-auto w-full'>
                            <img className=" h-full md:h-[496px] object-contain w-[512px] " src={screen1} alt="" />
                        </div>
                    </div>


                    <div className=' flex flex-col  justify-between  md:flex-row-reverse gap-[24.5] md:gap-[163px] mt-[56px] items-center text-start'>
                        <div className='px-[24px] md:px-0 w-full md:w-[753px] '>
                            <h1 className=' font-[600] text-[20px] md:text-[40px]'>Easily create and edit your diary entries in seconds</h1>
                            <p className=' text-[#8F96A3] font-[400] text-[12px] md:text-start text-center md:text-[18px] md:leading-[27px] leading-4 mt-[16px]'>Safe and secure space to be one with your thoughts not matter when , no matter where. Create multiple diaries entries throughout the day either with our website or by replying our reminders to you.</p>
                            <button className=' mt-[32px] mx-auto md:mx-0 mb-[24px] md:mb-0 bg-[#DA9658] flex items-center justify-center gap-[4px] text-white  rounded-lg px-[16px] py-[16px]'>Learn more <AiOutlineArrowRight className=' h-[17.66px] font-[400]' /> </button>
                        </div>
                        <div className='bg-gradient-to-t px-[48px] md:px-0 from-[#FAF2EA]  to-[#fff9f3] md:w-auto w-full'>
                            <img className=" h-full md:h-[496px] object-contain w-[512px] " src={screen2} alt="" />
                        </div>
                    </div>




                </section>



                <section>
                    <h1 id='howitworks' className=' font-[600] mb-[32px] text-[20px]  md:text-[40px]'>How it works</h1>
                    <div className='  grid gap-[44px] px-6 md:grid-cols-2 grid-cols-1'>
                        {howItWorks.map((item) => (
                            <div key={item.title} className=' bg-[white] p-[32px] rounded-lg  gap-[8px] md:text-start text-center flex flex-col'>
                                <img src={item.img} alt={item.title} className=' size-[72px] ' />
                                <h1 className=' font-[600] text-[20px]'>{item.title}</h1>
                                <p className=' text-[14px] text-[#4C4B53] '>{item.description}</p>
                            </div>
                        ))}

                    </div>
                </section>

            </section>

            <Footer />

        </div>
    )
}

export default LandingPage