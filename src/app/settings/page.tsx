'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  UserIcon,
  BellIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      title: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
      security: 'Security',
      language: 'Language',
      save: 'Save Changes',
      googleAccount: 'Google Account',
      notificationsEnabled: 'Notifications Enabled',
      notificationsDisabled: 'Notifications Disabled',
      twoFactor: 'Two-Factor Authentication',
      enable: 'Enable',
      disable: 'Disable',
    },
    ko: {
      title: '설정',
      profile: '프로필',
      notifications: '알림',
      security: '보안',
      language: '언어',
      save: '변경사항 저장',
      googleAccount: '구글 계정',
      notificationsEnabled: '알림 활성화됨',
      notificationsDisabled: '알림 비활성화됨',
      twoFactor: '2단계 인증',
      enable: '활성화',
      disable: '비활성화',
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserName(user.displayName || '');
        setUserEmail(user.email || '');
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setNotifications(userDoc.data().notifications || false);
        }
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  const handleLanguageChange = (lang: 'en' | 'ko') => {
    setLanguage(lang);
  };

  const handleNotificationsChange = async () => {
    const newNotificationState = !notifications;
    setNotifications(newNotificationState);
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        notifications: newNotificationState,
      });
    }
  };

  const handleSaveChanges = async () => {
    // Here you would typically update the user's profile in Firebase
    console.log('Saving changes...');
  };

  const renderContent = () => (
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
                {content[language].googleAccount}
              </label>
              <input
                type="text"
                value={userEmail}
                readOnly
                className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
            <button
              onClick={handleNotificationsChange}
              className={`px-4 py-2 rounded-full ${
                notifications
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {notifications
                ? content[language].notificationsEnabled
                : content[language].notificationsDisabled}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-500" />
            {content[language].security}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {content[language].twoFactor}
              </label>
              <button className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                {content[language].enable}
              </button>
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
              한국어
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
        <button
          onClick={handleSaveChanges}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
        >
          {content[language].save}
        </button>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout>
      {isLoading ? <LoadingSpinner /> : renderContent()}
    </DashboardLayout>
  );
}
