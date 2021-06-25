import { createContext, ReactNode, useEffect, useState } from 'react'

type Theme = 'light' | 'flames'

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

type ThemeContextProviderProps = {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme')
    return (storagedTheme ?? 'light') as Theme
  })

  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'flames' : 'light')
  }

  return(
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}