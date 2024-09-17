import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import EN from './languages/en.json';
import HN from './languages/hn.json';

const resources = {
    EN: { translation: EN },
    HN: { translation: HN },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'EN',
        resources,
        lng: 'EN',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;