import React from 'react';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';
import Wrapper from './components/Wrapper/Wrapper';

export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
    <Wrapper/>
    </LanguageProvider>
    </ThemeProvider>
  );
}