import axios from 'axios';

const API_KEY = 'AIzaSyBgsNpKVty9IKy55QMHxvoBcGPYOqLJhlE'; 

export const translateText = async (texts, targetLanguage) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  try {
    const response = await axios.post(url, {
      q: texts,
      target: targetLanguage,
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return texts;
  }
};