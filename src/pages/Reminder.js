import React, { useContext } from 'react'

import { Layout } from '../components/_Settings/Layout'
import Step2 from '../components/_Settings/Step2'
import { ToggleContext } from '../context/toggleContext';
import { FaBars } from 'react-icons/fa';

const Reminder = () => {
    const { toggle, handleToggle } = useContext(ToggleContext);

    return (
        <Layout>
            <div className='   bg-[white] text-start'>
                <button onClick={() => handleToggle(!toggle)} className='  flex md:hidden justify-start w-full mb-[10.25px]'><FaBars className='size-[15px]' /></button>
                <h1 className=' text-[20px] md:text-[30px] lg:text-[40px] font-[600] leading-[30px] md:leading-[60px]'>Change user preferences below</h1>
                <p className=' text-[14px] md:text-[18px] text-[#8F96A3] mt-[4px] md:mt-[8px] leading-[27px]'>Update reminder preferences</p>
            </div>
            <div className='w-full md:w-[631px]  flex justify-start  '>
                <Step2 />
            </div>

        </Layout>
    )
}

export default Reminder
