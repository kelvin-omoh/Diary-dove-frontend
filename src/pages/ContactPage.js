import React from 'react'
import Header from '../components/_LandingPage/New/Header'
import Footer from '../components/_LandingPage/Footer'

const ContactPage = () => {
    return (
        <div className=' pt-[35px] md:pt-[144px] pb-[5rem]  h-full  bg-[#FDFAF7]'>
            <Header />

            <div className='mb-[40px] px-[24px] md:px-[45.5px] rounded-[16px]  py-[40px] mx-[8px] md:mx-[80px] bg-white text-[#1D1E20] grid gap-[24px] md:gap-[69px]  md:grid-cols-2 justify-center items-start '>
                <div className=' w-full mt-0 md:mt-[1rem] md:w-[536px]'>
                    <h1 className=' text-[32px] mb-[8px] md:text-start text-center md:mb-[16px] font-[600] '>Contact Us</h1>
                    <p className=' hidden md:block text-[14px] leading-[21px]'>We Appreciate Your Feedback <br />
                        At DiaryDove, your experience matters to us. We are dedicated to continuously improving our platform, and your feedback plays a crucial role in helping us achieve this. Whether you have questions, suggestions, or concerns, we are eager to hear from you.
                        <br className=' size-[8px]  md:size-[16px]' />
                        <br className=' size-[8px]  md:size-[16px]' />
                        <br className=' size-[8px]  md:size-[16px]' />

                        How to Reach Us
                        <br />
                        Email: Feel free to email us at support@diarydove.com with your feedback, and our team will respond within 24 hours.
                        <br className=' size-[8px] md:size-[16px]' />
                        <br className=' size-[8px] md:size-[16px]' />
                        <br className=' size-[8px] md:size-[16px]' />
                        Phone: Contact our support team at (123) (803) 854 1242. We are available Monday to Friday, 9 AM - 5 PM.</p>
                </div>
                <div className=' w-full md:w-[584px] px-[12px] md:px-[24px] rounded-[8px] border border-[#B4B9C2] py-[15px] md:py-[40px] '>
                    <p>Prefer to leave your feedback online? Please fill out the form below, and we’ll ensure your voice is heard.</p>
                    <form action="" className=' flex flex-col gap-[16px] w-full mt-[50px]'>
                        <div className=' flex md:flex-row flex-col gap-[16px]  w-full items-start'>
                            <label className=' w-full gap-[8px] flex flex-col justify-start items-start  ' htmlFor="">
                                First Name
                                <input className=' w-full p-[16px] border-[#F1F2F3] border rounded-[8px] placeholder:text-[#DADCE0]' required placeholder='Ade******' type="text" />
                            </label>
                            <label className='w-full flex gap-[8px] flex-col justify-start items-start  ' htmlFor="">
                                Last Name
                                <input className=' w-full p-[16px] border-[#F1F2F3] border rounded-[8px] placeholder:text-[#DADCE0]' required placeholder='Ade' type="text" />
                            </label>
                        </div>
                        <div className=' flex md:flex-row flex-col gap-[16px]  w-full items-start'>   <label className=' flex flex-col gap-[8px] w-full' htmlFor="">
                            Phone Number
                            <input className=' w-full p-[16px] border-[#F1F2F3] border rounded-[8px] placeholder:text-[#DADCE0]' required placeholder='080326****' type="number" />
                        </label>
                            <label className='w-full flex flex-col gap-[8px]  ' htmlFor="">
                                Email Address
                                <input className=' w-full p-[16px] border-[#F1F2F3] border rounded-[8px] placeholder:text-[#DADCE0]' placeholder='Ade' type="email" />
                            </label>

                        </div>
                        <label className=' flex flex-col gap-[8px] ' htmlFor="">
                            Drop your feedback
                            <textarea placeholder=' Tell us more...' name="" id="" cols="30" className=' w-full p-[16px] h-[141px]  border-[#F1F2F3] border rounded-[8px] placeholder:text-[#DADCE0]' rows="10"></textarea>
                        </label>
                        <button className=' px-[12px] flex  text-[14px] my-[18px] font-[500] py-[8px] w-full md:w-[412px] md:py-[16px] bg-[#DA9658] text-center justify-center items-center text-white rounded-[8px] ' >Send Message</button>

                    </form>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default ContactPage