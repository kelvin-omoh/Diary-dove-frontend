import React from 'react'
import whatsapp from '../../assets/Group (1).png';
import google from '../../assets/icons8-google 1.png';
import { Checkbox } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const Step1 = () => {
    const checkboxTheme = createTheme({
        palette: {
            customColor: {
                main: '#DA9658',
            },
        },
    });
    return (
        <>
            <div className="flex md:flex-row  md:gap-0 gap-[1rem] items-center justify-center flex-col space-x-4">
                <label className="flex w-[220px] justify-center  rounded-lg h-[64px]  border boder-[#F1F2F3]  items-center space-x-2">
                    <input type="checkbox" className="hidden" />
                    <img className="size-[32px]" src={google} alt="DiaryDove Logo" />
                    <span>Google</span>
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox disabled className=' rounded-lg' defaultChecked style={{ color: '#E9EAED' }} />
                    </ThemeProvider>
                </label>
                <label className="flex w-[220px] justify-center  rounded-lg h-[64px]  border boder-[#F1F2F3]  items-center space-x-2">
                    <input type="checkbox" className="hidden" />
                    <img className="size-[32px]" src={whatsapp} alt="DiaryDove Logo" />
                    <span>WhatsApp</span>
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox defaultChecked className=' rounded-lg' style={{ color: checkboxTheme.palette.customColor.main }} />
                    </ThemeProvider>
                </label>
            </div>

            <p className="mt-8 text-[18px] ">Notification period</p>
            <div className="flex flex-col mx-auto justify-center items-center  gap-[16px]  mt-2 space-y-2">
                <label className="flex w-[300px]  md:w-[400px] border boder-[#F1F2F3] rounded-lg text-[#8F96A3] py-[16px] justify-between pl-[32px] pr-[17px] flex-row-reverse items-center space-x-2">
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox className=' rounded-lg' defaultChecked style={{ color: checkboxTheme.palette.customColor.main }} />
                    </ThemeProvider>
                    <span>Morning - 9:00am</span>
                </label>
                <label className="flex   w-[300px]  md:w-[400px] border boder-[#F1F2F3] rounded-lg text-[#8F96A3] py-[16px] justify-between pl-[32px] pr-[17px] flex-row-reverse items-center space-x-2">
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox className=' rounded-lg' defaultChecked style={{ color: checkboxTheme.palette.customColor.main }} />
                    </ThemeProvider>
                    <span>Afternoon - 3:00pm</span>
                </label>
                <label className="flex   w-[300px]  md:w-[400px] border boder-[#F1F2F3] rounded-lg text-[#8F96A3] py-[16px] justify-between pl-[32px] pr-[17px] flex-row-reverse items-center space-x-2">
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox className=' rounded-lg' defaultChecked style={{ color: checkboxTheme.palette.customColor.main }} />
                    </ThemeProvider>
                    <span>Evening - 9:00pm</span>
                </label>
            </div>

        </>
    )
}

export default Step1
