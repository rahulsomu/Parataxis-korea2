import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = localStorage.getItem("theme");
  const [isDayMode, setIsDayMode] = useState(theme === "day" || false);
  const toggleTheme = useCallback(() => {
    setIsDayMode((prev) => !prev);
    localStorage.setItem("theme", isDayMode ? "night" : "day");
  }, [isDayMode]);

  const value = {
    isDayMode,
    toggleTheme,
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDayMode(storedTheme === "day");
    } else {
      localStorage.setItem("theme", "night");
    }
  }, []);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
