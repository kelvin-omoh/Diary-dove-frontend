import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from '../../assets/Logout.png'
import Logo from '../../assets/DiaraDove Logo.png'



const Sidebar = () => {
  const location = useLocation();
  console.log(location);

  const allRoutes=[
    {
        text:"User Account",
        route:"/settings",

  },{
    text:"Reminder",
    route:"/settings/reminder",
  }
]

  
  return (
  <div>
         <div className=' h-full grid gap-[542px]  w-[320px]  border  border-y-0 '>
        
        <div className=' flex flex-col h-[285px] pt-6 text-center gap-[77px] text-black  '>
            <h1 className='text-[32px] font-[600]   '>Settings</h1>
            <ul className=' w-full '>
        {allRoutes.map((item)=>(
            <li  className={` py-[18px] mx-auto w-full ${location.pathname === item.route  ? ' text-center font-normal border-r-[1px] border-r-amber-600 ':''} `} >
          <Link to={item.route}   className={location.pathname === item.route  ? ' grid text-center  text-[24px]' : ''}>{item.text}</Link>
        </li> 
        ))}
       
       
      </ul>
    </div>
    <div  className=' flex items-center justify-center gap-4'>
        <img src={Logout} className=' size-8' alt='logout icon'/>
        <h1>Log out</h1>
    </div>
    </div>
    </div>
   
    
  );
};

export default Sidebar;
