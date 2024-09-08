import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessPopup from './SuccessPopup';

interface SurveyDeploymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: () => void;
  language: 'en' | 'ko';
}

const content = {
  en: {
    title: 'Deploy Survey',
    message: 'Are you sure you want to deploy this survey?',
    cancel: 'Cancel',
    deploy: 'Deploy',
  },
  ko: {
    title: '설문조사 발송',
    message: '이 설문조사를 발송하시겠습니까?',
    cancel: '취소',
    deploy: '발송',
  },
};

const SurveyDeploymentPopup: React.FC<SurveyDeploymentPopupProps> = ({
  isOpen,
  onClose,
  onDeploy,
  language,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeploy = () => {
    onDeploy();
    setShowSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!showSuccess ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {content[language].title}
            </h2>
            <p className="mb-6 text-gray-600">{content[language].message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                {content[language].cancel}
              </button>
              <button
                onClick={handleDeploy}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {content[language].deploy}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <SuccessPopup language={language} />
      )}
    </AnimatePresence>
  );
};

export default SurveyDeploymentPopup;
