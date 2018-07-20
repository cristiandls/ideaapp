import i18n from 'react-native-i18n';
import es from './locales/es';
import en from './locales/en';

i18n.fallbacks = true;

i18n.translations = {
  es,
  en
};

export default i18n;
