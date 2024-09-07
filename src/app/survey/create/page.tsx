'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import SurveyForm from '../../../components/SurveyForm';
import { motion } from 'framer-motion';

export default function CreateSurvey() {
  const [templateId, setTemplateId] = useState('');
  const router = useRouter();
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Create New Survey',
      description:
        'Select a template and start your organizational culture survey.',
      englishTemplate: 'English Survey Template',
      koreanTemplate: 'Korean Survey Template',
      createButton: 'Create Survey',
    },
    ko: {
      title: '새 설문조사 만들기',
      description: '템플릿을 선택하고 조직 문화 설문조사를 시작하세요.',
      englishTemplate: '영어 설문 템플릿',
      koreanTemplate: '한국어 설문 템플릿',
      createButton: '설문조사 만들기',
    },
  };

  const handleTemplateSelect = (id: string) => {
    setTemplateId(id);
  };

  const handleCreateSurvey = () => {
    if (templateId) {
      // Here you would typically create a new survey in your database
      // For now, we'll just navigate to the SurveyForm component
      router.push(`/survey/${templateId}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            {content[language].title}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {content[language].description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                templateId === 'english'
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-white'
              }`}
              onClick={() => handleTemplateSelect('english')}
            >
              <h3 className="text-xl font-semibold mb-2">
                {content[language].englishTemplate}
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                templateId === 'korean'
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'bg-white'
              }`}
              onClick={() => handleTemplateSelect('korean')}
            >
              <h3 className="text-xl font-semibold mb-2">
                {content[language].koreanTemplate}
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </motion.div>
          </div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition duration-300 ${
                templateId
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleCreateSurvey}
              disabled={!templateId}
            >
              {content[language].createButton}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
