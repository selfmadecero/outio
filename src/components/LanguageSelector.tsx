import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  onChange: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
      >
        {language === 'en' ? '🇺🇸 EN' : '🇰🇷 KO'}
      </button>
    </div>
  );
};

export default LanguageSelector;
