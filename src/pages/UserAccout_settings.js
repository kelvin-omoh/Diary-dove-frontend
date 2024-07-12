import React from 'react'
import profileImg from '../assets/Frame 1000004148.png'

import Search from '../assets/Search 2.png'
import Logo from '../assets/DiaraDove Logo.png'
import NotificaitonLogo from '../assets/Notification 2.png'
import settingLogo from '../assets/Setting.png'
import WhatsappIcon  from '../assets/Group (1).png'
import GoogleIcon from '../assets/icons8-google 1.png'
import Checkbox from '@mui/material/Checkbox'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import eye from '../assets/eye.png'
import key from '../assets/key.png'
 

const UserAccout_settings=()=>{
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

const handleImageUpload = e =>{
const [file] = e.target.files
  if (file) {
const reader =new FileReader();
const {current} = uploadedImage;
current.file =file ; 
reader.onload = (e) =>{
  current.src = e.target.result
}
reader.readAsDataURL(file)
}
};

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  


  const checkboxTheme = createTheme({
    palette: {
        customColor: {
            main: '#DA9658',
        },
    },
});


  return (
    <div className='grid   md:pt-[56px] md:px-[151px]'>
      <div  className='flex md:gap-6 items-center text-center  '>
     
        <p > upload profile pictures</p> 
        <input type="file" accept="image/*"  className='hidden'
        ref={imageUploader} onChange={handleImageUpload} />
          <button ref={uploadedImage} onClick={() => imageUploader.current.click()} className='bg-[#DA9658] h-10 flex rounded items-center text-center text-white p-6'>Upload </button>
          <button className='bg-gray-50 h-10 flex rounded items-center text-center text-black p-6'>Remove</button>
      </div>
      <div className='grid gap-8 pb-6  '>
      <p className=' py-6 capitalize text-gray-400 w-fit'>personal information</p>

<div className='flex gap-14 '>

  <div className='grid items-center justify-start '>
    <p className=' w-fit'>fullName</p>
    <div className="input-group flex  p-2 md:relative md:top-0 md:right-0 top-[50px] right-20 border-2 items-center gap-2 w-fit rounded text-center">
      <span className=' gap-1'><img className=' size-5' src={profileImg} alt='profileImage'/></span>
      <input placeholder='enter fullname' type="text" ></input>
    </div> 
    
  </div>
  <div className='grid items-center justify-start '>
    <p className=' w-fit'>User Name</p>
    <div className="input-group flex  p-2 md:relative md:top-0 md:right-0 top-[50px] right-20 border-2 items-center gap-2 w-fit rounded text-center">
      <span className=' gap-1'><img className=' size-5' src={profileImg} alt='profileImage'/></span>
      <input placeholder='enter username' type="text" ></input>
    </div> 
  </div>
  
 
</div>

<div className='flex gap-14'>

 <div className='grid items-stat justify-start'>
    <p className=' capitalize w-fit'>email address</p>
    <div className='border rounded p-2 flex justify-between ' >
      <input placeholder='enter your email' className=' bg-transparent ' type="text" ></input>
    <span className=' gap-1'> <button className='w-fit text-[#DA9658] ' >Change</button></span>
    </div>
  </div>
  <div className='grid items-center justify-start '>
    <p className='w-fit'>Phone Number</p>
    <div className="input-group flex  p-2 md:relative md:top-0 md:right-0 top-[50px] right-20 border-2 items-center gap-2 w-fit rounded text-center">
      <span className=' gap-1'><img className=' size-5' src={profileImg} alt='profileImage'/></span>
      <input placeholder='090 555 ****' type="text" ></input>
      <span className=' gap-1'> <button className='w-fit text-[#DA9658] ' >Change</button></span>

    </div>
  </div>
</div>
      </div>
      <div className='border-t-2 grid justify-start py-6 gap-6'>
    <p className=' w-fit capitalize  text-neutral-400'>security and privacy</p>

<div className='flex gap-14 '>

<div className='grid  justify-start '>
  <p className='w-fit' >current password</p>
  <div className="input-group flex  p-2 md:relative md:top-0 md:right-0 top-[50px] right-20 border-2 items-center gap-2 w-fit rounded text-center">
    <span className=' gap-1'><img className=' size-5' src={key} alt='profileImage'/></span>
    <input placeholder='********' type="text" ></input>
    <span className=' gap-1'><img className=' size-5' src={eye} alt='profileImage'/></span>

  </div> 
  
</div>
<div className='grid items-center justify-start '>
  <p className=' w-fit'>New Password</p>
  <div className="input-group flex  p-2 md:relative md:top-0 md:right-0 top-[50px] right-20 border-2 items-center gap-2 w-fit rounded text-center">
    <span className=' gap-1'><img className=' size-5' src={key} alt='profileImage'/></span>
    <input placeholder='********' type="text" ></input>
    <span className=' gap-1'><img className=' size-5' src={eye} alt='profileImage'/></span>

  </div> 
</div>


</div>
      </div>
      <button className='bg-[#DA9658] w-[359px] rounded h-[60px] my-[142px] p-6'> save changes</button>
            
      </div>

       
   
  );
}
export default UserAccout_settings;