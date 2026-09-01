import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = 'NEXUS_THEME_STORAGE_V1';

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      const root = document.documentElement;
      root.classList.remove('dark', 'solar', 'light');

      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'solar') {
        root.classList.add('dark', 'solar');
      } else {
        root.classList.add('light');
      }
    } catch (e) {
      console.error("Theme storage update failed", e);
    }
  }, [theme]);

  const cycleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'solar';
      return 'light';
    });
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};
