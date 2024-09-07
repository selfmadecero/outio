'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  UserIcon,
  BellIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);

  const content = {
    en: {
      title: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
      security: 'Security',
      language: 'Language',
      save: 'Save Changes',
    },
    ko: {
      title: '설정',
      profile: '프로필',
      notifications: '알림',
      security: '보안',
      language: '언어',
      save: '변경사항 저장',
    },
  };

  const handleLanguageChange = (lang: 'en' | 'ko') => {
    setLanguage(lang);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {content[language].title}
        </motion.h1>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <UserIcon className="h-6 w-6 mr-2 text-blue-500" />
              {content[language].profile}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BellIcon className="h-6 w-6 mr-2 text-blue-500" />
              {content[language].notifications}
            </h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="ml-2 block text-sm text-gray-900">
                {notifications ? 'Enabled' : 'Disabled'}
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <LockClosedIcon className="h-6 w-6 mr-2 text-blue-500" />
              {content[language].security}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <GlobeAltIcon className="h-6 w-6 mr-2 text-blue-500" />
              {content[language].language}
            </h2>
            <div className="flex items-center">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-4 py-2 rounded-full mr-2 ${
                  language === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('ko')}
                className={`px-4 py-2 rounded-full ${
                  language === 'ko'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Korean
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300">
            {content[language].save}
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
