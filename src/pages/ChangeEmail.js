import React from 'react'

const ChangeEmail = () => {

    const handleSendOtp = (e) => {
        e.preventDeault()

    }

    return (
        <div className='w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className='text-start w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[80px] md:w-[570px] py-[24px] md:py-[48px]  flex justify-center flex-col m-0 bg-[#ffffff]'>
                <h1 className='font-[600] text-[20px] md:text-[32px] '>Change email address</h1>

                <p className='text-[#8F96A3] mt-[16px] mb-[24px] md:mb-[48px]'>Input your preferred email address below to get your reset code (OTP)</p>

                <form className='flex flex-col gap-[16px]' onSubmit={(e) => handleSendOtp(e)}>
                    <label className='flex flex-col text-[14px] md:text-[16px]' htmlFor="new-password">
                        Email
                        <div className='relative'>
                            <input

                                placeholder='Steven***@gmail.com'
                                className={`mt-[8px] p-[16px] border border-[#B4B9C2] rounded-[8px] w-full`}
                                id="new-password"

                            />
                        </div>

                    </label>
                    <button type="submit" className='mt-[16px] py-[12px] md:p-y[16px] bg-[#DA9658] text-white rounded-[8px]'>Send OTP</button>
                </form>

            </div>
        </div>
    )
}

export default ChangeEmail
