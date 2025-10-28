import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_KEY = 'AIzaSyBgsNpKVty9IKy55QMHxvoBcGPYOqLJhlE';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const language = useSelector((state) => state.language.language); // Redux or state management
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Optionally: load initial translations or setup
  }, [language]);

  const translate = async (text) => {
    if (!text || translations[text]) {
      return translations[text] || text;
    }

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: language,
        }
      );
      const translatedText = response.data.data.translations[0]?.translatedText || text;
      setTranslations((prev) => ({ ...prev, [text]: translatedText }));
      return translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text;
    }
  };

  return (
    <TranslationContext.Provider value={{ translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslate must be used within a TranslationProvider');
  }
  return context.translate;
};
