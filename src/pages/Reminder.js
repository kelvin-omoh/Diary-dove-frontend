import React from 'react'
import { Layout } from '../components/_Settings/Layout'
import Step2 from '../components/_Settings/Step2'

const Reminder = () => {
    return (
        <Layout>
            <div className=' text-start'>
                <h1 className=' text-[40px] font-[600] leading-[60px]'>Change user preferences below</h1>
                <p className=' text-[18px] text-[#8F96A3] mt-[8px] leading-[27px]'>Update reminder preferences</p>
            </div>
            <div className=' w-[631px] flex justify-start  '>
                <Step2 />
            </div>

        </Layout>
    )
}

export default Reminder
