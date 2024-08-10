import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ToggleContext } from '../../context/toggleContext';

export const Layout = ({ children }) => {
    const { toggle, handleToggle } = useContext(ToggleContext);
    console.log(toggle);
    return (

        <div className=' w-[100vw] h-full relative'>

            <Sidebar />
            <div className=' ml-0 md:ml-[320px] h-full relative '>
                <div className={` z-0 md:z-[100]' : ' md:z-[100] z-[0]'} relative h-fit w-full`}>

                    <div className=' w-full bg-white  h-[100vh]   shadow-lg rounded-l-0 md:rounded-l-[48px] '>
                        <Header />
                        <div className='px-[24px] lg:px-[80px] h-full overflow-y-scroll pt-[48px]'>
                            <div className=' rounded-0 md:rounded-full pt-[81px] '>
                                {React.Children.map(children, (child) => {
                                    return React.cloneElement(child, { toggle, handleToggle });
                                })}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    );
};
