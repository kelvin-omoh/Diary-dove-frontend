import { Switch } from '@mui/material';
import React, { useState } from 'react';

const ToggleIcon = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const IOSSwitch = (props) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
            checked={checked}
            onChange={handleChange}
            sx={{
                width: 62,
                height: 30,
                marginL: 8,
                padding: 0,
                '& .MuiSwitch-switchBase': {
                    transitionDuration: '300ms',
                    '&.Mui-checked': {
                        transform: 'translateX(25px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                            backgroundColor: '#02AB75',
                            opacity: 1,
                            border: 0,
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: 0.5,
                        },
                    },
                    '&.Mui-focusVisible .MuiSwitch-thumb': {
                        color: '#33cf4d',
                        border: '6px solid #fff',
                    },
                    '&.Mui-disabled .MuiSwitch-thumb': {
                        color: (theme) => theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[600],
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: (theme) => theme.palette.mode === 'light' ? 0.7 : 0.3,
                    },
                },
                '& .MuiSwitch-thumb': {
                    boxSizing: 'border-box',
                    width: 22,
                    height: 22,
                    marginTop: -0.5,
                },
                '& .MuiSwitch-track': {
                    borderRadius: 26 / 2,
                    backgroundColor: (theme) => theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
                    opacity: 1,
                    transition: (theme) => theme.transitions.create(['background-color'], {
                        duration: 500,
                    }),
                },
            }}
        />
    );

    return (
        <IOSSwitch inputProps={{ 'aria-label': 'iOS design' }} />
    );
};

export default ToggleIcon;