import { createContext, useContext, useState } from 'react';
import { en } from '../data/translations/en';
import { ta } from '../data/translations/ta';

const translations = { en, ta };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    // Fallback to English if Tamil key is missing
    if (val === undefined) {
      val = translations.en;
      for (const k of keys) val = val?.[k];
    }
    return val ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
