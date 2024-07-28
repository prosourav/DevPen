import React, { FC, useState, createContext } from "react";
import { theme as Theme } from "../constants"; // Assuming Theme is exported from constants
import storage from "../utils/storage";

interface ThemeProps {
  children: React.ReactElement;
}

export interface ThemeContextProps {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const initialData: Theme = 'dark';

export const EditorThemeProvider: FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return storage.retrieve<Theme>('theme') || initialData;
    } catch (error) {
      console.error("Failed to retrieve theme from storage:", error);
      return initialData;
    }
  });

  const themeFeatures = {
    theme,
    updateTheme: setTheme,
  };

  return (
    <ThemeContext.Provider value={themeFeatures}>
      {children}
    </ThemeContext.Provider>
  );
};
export default EditorThemeProvider;
