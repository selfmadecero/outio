import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface OnboardingButtonProps {
  onClick: () => void;
  language: 'en' | 'ko';
}

const content = {
  en: {
    buttonText: 'Need help?',
  },
  ko: {
    buttonText: '도움이 필요하신가요?',
  },
};

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  onClick,
  language,
}) => {
  const { buttonText } = content[language];

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 hover:bg-indigo-700 transition duration-300 z-50"
    >
      <QuestionMarkCircleIcon className="h-5 w-5" />
      <span>{buttonText}</span>
    </button>
  );
};

export default OnboardingButton;
