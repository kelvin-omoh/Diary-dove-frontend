import React, { createContext, useState } from 'react';

export const ToggleContext = createContext();

export const ToggleContextProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = (state) => {
        setToggle(state);
    };

    return (
        <ToggleContext.Provider value={{ toggle, handleToggle }}>
            {children}
        </ToggleContext.Provider>
    );
};
