import React from 'react';

const Inputs = ({ otpValues, setOtpValues, otp, setOtp }) => {

    const handleInputChange = (index, event) => {
        const value = event.target.value;

        if (/^\d$/.test(value)) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
            const newOtp = newOtpValues.join('');
            setOtp(newOtp); // Ensure setOtp is correctly defined and passed
            if (index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        } else if (event.nativeEvent.inputType === 'deleteContentBackward') {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = '';
            setOtpValues(newOtpValues);
            const newOtp = newOtpValues.join('');
            setOtp(newOtp); // Ensure setOtp is correctly defined and passed
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };


    return (
        <div className=' mt-[20px] mx-auto flex  justify-center items-center w-full md:mt-[40px]'>
            {otpValues.map((value, index) => (
                <input
                    key={index}
                    className=' w-[35px] md:w-[39px] md:px-[8.17px] text-center my-auto mx-auto border-[2px] border-[#F1F2F3] h-[56px] rounded-[8px]'
                    id={`otp-input-${index}`}
                    type='number'
                    maxLength={1}
                    placeholder='-'
                    size={1}
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                />
            ))}
        </div>
    );
};

export default Inputs;
