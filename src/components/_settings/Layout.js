import React from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'

export const Layout = ({ children }) => {
    return (
        <div className=' relative'>
            <Header />
            <Sidebar />
            <div className='ml-[320px] relative z-0 mt-[88px] px-[144px] py-[80px] '>
                {children}
            </div>

        </div>
    )
}
