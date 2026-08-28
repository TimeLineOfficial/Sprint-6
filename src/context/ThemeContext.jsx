import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = 'NEXUS_THEME_STORAGE_V1';

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved || 'cyberpunk';
    } catch {
      return 'cyberpunk';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      const root = document.documentElement;
      root.classList.remove('theme-cyberpunk', 'theme-matrix', 'theme-solar');
      root.classList.add(`theme-${theme}`);

      if (theme === 'solar') {
        root.classList.remove('dark');
        root.classList.add('light');
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
      }
    } catch (e) {
      console.error("Theme storage update failed", e);
    }
  }, [theme]);

  const cycleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'cyberpunk') return 'matrix';
      if (prev === 'matrix') return 'solar';
      return 'cyberpunk';
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
