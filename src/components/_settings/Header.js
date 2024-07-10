import React from 'react'
import useRef from 'react'
import Logo from '../../assets/DiaraDove Logo.png'
import NotificaitonLogo from '../../assets/Notification 2.png'
import settingLogo from '../../assets/Setting.png'


const Header = () => {
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


  return (
       
<div className='flex w-full items-center  px-20 py-4 border border-t-0 border-x-0  justify-between gap-3'>
        <div className='size-fit text-white justify-center w-44'>
          <img className=" " src={Logo} alt="DiaryDove Logo" />
        </div>

        <div className='flex relative items-center justify-center gap-2'>
        <img  type="file" accept="image/*" multiple = "false" />
        <input type="file" accept="image/*"  className='hidden'
        ref={imageUploader} onChange={handleImageUpload} />
          <div className=' flex item gap-4 justify-end  w-full items-center  '> 
            <img src={NotificaitonLogo} alt='notificationLogo' className='size-4' />
            <img ref={uploadedImage} onClick={() => imageUploader.current.click()} className='w-10 h-10 border rounded-full '/>
         
          
      </div>

        </div>
      </div> 
   
  


  )
}

export default Header