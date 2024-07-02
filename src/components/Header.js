import React from 'react'
import logo from '../assets/DiaraDove Logo.png'
import Bell from '../assets/Notification 2.png'
import { BsBell, BsBellSlash } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai'
const Header = () => {
    return (
        <div className='  border-b-[1px] border-[#B4B9C2]  flex justify-between   px-[80px] py-[18px]  '>

            <div>
                <img className=' w-[146px] h-[36px]' src={logo} alt={'logo'} />
            </div>
            <div className=' flex items-center gap-[19.8px]'>
                <img className=' h-[22.25px] ' src={Bell} alt={'logo'} />
                <AiFillSetting className='text-[#B4B9C2] ' size={20} />
            </div>
        </div>
    )
}

export default Header