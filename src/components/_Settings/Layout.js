import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ToggleContext } from '../../context/toggleContext';

export const Layout = ({ children }) => {
    const { toggle, handleToggle } = useContext(ToggleContext);
    console.log(toggle);
    return (

        <div className='bg-[#DA9658] w-[100vw] h-[100vh] relative'>
            <Header />
            <Sidebar />
            <div className='bg-[#DA9658] ml-0 md:ml-[320px] pt-[104px] relative z-0 px-[144px] pb-[80px]'>
                <div className='absolute top-0 right-0 rounded-tl-[16px] w-full px-[24px] md:px-[80px] pt-[103px] md:pt-[152px] ml-[220px] bg-[#ffffff]'>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { toggle, handleToggle });
                    })}
                </div>
            </div>
        </div>

    );
};
