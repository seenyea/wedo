import React, { Context, createContext, useEffect, useState } from 'react';

import THEME from '@src/consts/theme-const';

const { light, dark } = THEME;

interface ThemeContextProps {
  themeName: string;
  toggleTheme: () => void;
}

const ThemeContext: Context<ThemeContextProps> = createContext<ThemeContextProps>({} as any);

interface ChildProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ChildProps> = ({ children }) => {
  const [themeName, setThemeName] = useState(light)

  useEffect(() => {
    const darkMediaQuery = window.matchMedia(`(prefers-color-scheme: ${dark})`);
    setThemeName(darkMediaQuery.matches ? dark : light)
    darkMediaQuery.addEventListener('change', (e) => {
      setThemeName(e.matches ? dark : light)
    });
  }, [])

  const toggleTheme = () => {
    const name = themeName === dark ? light : dark
    localStorage.setItem('themeName', name)
    setThemeName(name)
  }

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
