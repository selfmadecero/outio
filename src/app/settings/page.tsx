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
  UsersIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/LoadingSpinner';

// 더미 데이터
const dummyEmployees = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  email: `employee${i + 1}@example.com`,
  role: [
    'Manager',
    'Developer',
    'Designer',
    'HR Specialist',
    'Marketing Specialist',
    'Sales Representative',
    'Product Manager',
    'Data Analyst',
    'Customer Support',
    'QA Engineer',
  ][i % 10],
  department: [
    'Sales',
    'Engineering',
    'Product',
    'Human Resources',
    'Marketing',
    'Customer Service',
    'Finance',
    'Operations',
  ][i % 8],
}));

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [userName, setUserName] = useState('Demo User');
  const [userEmail, setUserEmail] = useState('demo@example.com');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [employees, setEmployees] = useState(dummyEmployees);
  const [searchTerm, setSearchTerm] = useState('');

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
      employeeManagement: 'Employee Management',
      inviteEmployee: 'Invite Employee',
      manageEmployees: 'Manage Employees',
      searchEmployees: 'Search Employees',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      department: 'Department',
      actions: 'Actions',
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
      employeeManagement: '임직원 관리',
      inviteEmployee: '임직원 초대',
      manageEmployees: '임직원 관리',
      searchEmployees: '임직원 검색',
      name: '이름',
      email: '이메일',
      role: '역할',
      department: '부서',
      actions: '작업',
    },
  };

  useEffect(() => {
    // 데모 목적으로 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLanguageChange = (lang: 'en' | 'ko') => {
    setLanguage(lang);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    // 여기에서 변경사항을 저장하는 로직을 구현할 수 있습니다.
  };

  const renderEmployeeManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8 mb-6 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <UsersIcon className="h-7 w-7 mr-3 text-blue-500" />
          {content[language].employeeManagement}
        </h2>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 flex items-center shadow-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          {content[language].inviteEmployee}
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={content[language].searchEmployees}
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-full pl-12 focus:outline-none focus:border-blue-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-4" />
        </div>
      </div>
      <div className="overflow-x-auto max-h-[600px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {['name', 'email', 'role', 'department', 'actions'].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {content[language][header as keyof typeof content.en]}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees
              .filter(
                (employee) =>
                  employee.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  employee.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button className="text-indigo-600 hover:text-indigo-900 transition duration-300">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderContent = () => (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-16 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
      >
        {content[language].title}
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            {[
              'profile',
              'notifications',
              'security',
              'language',
              'employeeManagement',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left py-3 px-6 rounded-xl mb-2 transition duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {content[language][tab]}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-3/4 space-y-8">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <UserIcon className="h-7 w-7 mr-3 text-blue-500" />
                {content[language].profile}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].googleAccount}
                  </label>
                  <input
                    type="text"
                    value={userEmail}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <BellIcon className="h-7 w-7 mr-3 text-blue-500" />
                {content[language].notifications}
              </h2>
              <div className="flex items-center">
                <button
                  onClick={handleNotificationsChange}
                  className={`px-6 py-3 rounded-full text-white font-medium transition duration-300 ${
                    notifications
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                >
                  {notifications
                    ? content[language].notificationsEnabled
                    : content[language].notificationsDisabled}
                </button>
              </div>
            </motion.div>
          )}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <ShieldCheckIcon className="h-7 w-7 mr-3 text-blue-500" />
                {content[language].security}
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].twoFactor}
                </label>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md">
                  {content[language].enable}
                </button>
              </div>
            </motion.div>
          )}
          {activeTab === 'language' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <GlobeAltIcon className="h-7 w-7 mr-3 text-blue-500" />
                {content[language].language}
              </h2>
              <div className="flex items-center space-x-4">
                {['en', 'ko'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang as 'en' | 'ko')}
                    className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                      language === lang
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {lang === 'en' ? 'English' : '한국어'}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'employeeManagement' && renderEmployeeManagement()}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <button
          onClick={handleSaveChanges}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
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
