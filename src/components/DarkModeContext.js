import  { useState, useEffect } from 'react';
import React from 'react';

 export const DarkModeContext = React.createContext();


export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Get the initial value from local storage or default to false
    const savedValue = localStorage.getItem('darkMode');
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });

  // Use useEffect to save the state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
