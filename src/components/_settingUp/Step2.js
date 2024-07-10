import { Checkbox, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
const checkboxTheme = createTheme({
    palette: {
        customColor: {
            main: '#DA9658',
        },
    },
});

const timing = [
    {
        text: "Weekly"
    },
    {
        text: "Monthly"
    },
    {
        text: "Quarterly"
    },
    {
        text: "Yearly"
    },
]
const Step2 = () => {
    return (
        <div className=' flex flex-col gap-[16px]'>
            {timing.map((timing) => (
                <label key={timing} className="flex   w-[300px]  md:w-[400px] border boder-[#F1F2F3] rounded-lg text-[#8F96A3] py-[16px] justify-between pl-[32px] pr-[17px] flex-row-reverse items-center space-x-2">
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox className=' rounded-lg' defaultChecked style={{ color: checkboxTheme.palette.customColor.main }} />
                    </ThemeProvider>
                    <span>{timing.text}</span>
                </label>
            ))}

        </div>
    )
}

export default Step2
