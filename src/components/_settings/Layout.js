import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export const Layout = ({ children }) => {
    return (
        <div className='bg-[#4e453d] w-[100vw]  h-full relative'>
            {/* <Header />
            <Sidebar /> */}
            {/* <div className='ml-[320px] bg-[white] relative z-0  px-[144px] py-[80px] '> */}
            {children}
            {/* </div> */}

        </div>
    )
}
