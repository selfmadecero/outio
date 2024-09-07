'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

export default function Feedback() {
  const { language } = useLanguage();
  const [feedback, setFeedback] = useState('');

  const content = {
    en: {
      title: 'Feedback',
      description:
        'We value your feedback. Please share your thoughts with us.',
      placeholder: 'Type your feedback here...',
      submit: 'Submit Feedback',
      recentFeedback: 'Recent Feedback',
    },
    ko: {
      title: '피드백',
      description: '귀하의 피드백을 소중히 여깁니다. 의견을 공유해 주세요.',
      placeholder: '여기에 피드백을 입력하세요...',
      submit: '피드백 제출',
      recentFeedback: '최근 피드백',
    },
  };

  const recentFeedbacks = [
    { id: 1, text: 'Great app! Very intuitive to use.', date: '2023-06-10' },
    {
      id: 2,
      text: 'Could use more customization options.',
      date: '2023-06-09',
    },
    {
      id: 3,
      text: 'Love the new features in the latest update!',
      date: '2023-06-08',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {content[language].title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-600 mb-8"
        >
          {content[language].description}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mb-12"
        >
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={content[language].placeholder}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 inline-flex items-center"
            >
              {content[language].submit}
              <PaperAirplaneIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            {content[language].recentFeedback}
          </h2>
          {recentFeedbacks.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-start"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-700">{item.text}</p>
                <p className="text-sm text-gray-500 mt-1">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
