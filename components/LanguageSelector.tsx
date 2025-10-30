import React from 'react';
import type { Language } from '../types';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguageCode: string;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguageCode, onSelectLanguage }) => {
  return (
    <div className="flex justify-center items-center gap-4 my-6">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => onSelectLanguage(lang)}
          className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300
            ${selectedLanguageCode === lang.code 
              ? 'bg-blue-500 text-white shadow-lg scale-110' 
              : 'bg-white text-slate-600 hover:bg-blue-100'
            }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;