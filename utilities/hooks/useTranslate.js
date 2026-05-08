
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyBgsNpKVty9IKy55QMHxvoBcGPYOqLJhlE'; 
const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const useTranslate = (texts) => {
  const language = useSelector(state => state.language.language);
  const [translations, setTranslations] = useState({});

  const fetchTranslations = async () => {
    try {
      const response = await axios.post(TRANSLATE_URL, {
        q: texts,
        target: language,
      });
      const translatedTexts = response.data.data.translations;
      const translationsMap = {};
      translatedTexts.forEach((translation, index) => {
        translationsMap[texts[index]] = translation.translatedText;
      });
      setTranslations(translationsMap);
    } catch (error) {
      console.error('Error fetching translations:', error.response?.data || error.message);
    }
  };

  const translate = (text) => {
    return translations[text] || text;
  };

  useEffect(() => {
    if (texts.length > 0) {
      // fetchTranslations();
    }
  }, [language, texts]);

  return translate;
};
