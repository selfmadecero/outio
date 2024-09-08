'use client';

import { useState, useEffect, Suspense } from 'react';
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
  XMarkIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchParamsWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return children;
}

// 더미 데이터
const dummyEmployees = [
  {
    id: 1,
    koreanName: '김지훈',
    englishName: 'Ji-hoon Kim',
    email: 'jihoon.kim@example.com',
    role: 'Manager',
    department: 'Sales',
  },
  {
    id: 2,
    koreanName: '이서연',
    englishName: 'Seo-yeon Lee',
    email: 'seoyeon.lee@example.com',
    role: 'Developer',
    department: 'Engineering',
  },
  {
    id: 3,
    koreanName: '박민준',
    englishName: 'Min-jun Park',
    email: 'minjun.park@example.com',
    role: 'Designer',
    department: 'Product',
  },
  {
    id: 4,
    koreanName: '정수빈',
    englishName: 'Su-bin Jung',
    email: 'subin.jung@example.com',
    role: 'HR Specialist',
    department: 'Human Resources',
  },
  {
    id: 5,
    koreanName: '최예린',
    englishName: 'Ye-rin Choi',
    email: 'yerin.choi@example.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
  },
  {
    id: 6,
    koreanName: '강도윤',
    englishName: 'Do-yoon Kang',
    email: 'doyoon.kang@example.com',
    role: 'Sales Representative',
    department: 'Sales',
  },
  {
    id: 7,
    koreanName: '윤서아',
    englishName: 'Seo-ah Yoon',
    email: 'seoah.yoon@example.com',
    role: 'Product Manager',
    department: 'Product',
  },
  {
    id: 8,
    koreanName: '임재현',
    englishName: 'Jae-hyun Lim',
    email: 'jaehyun.lim@example.com',
    role: 'Data Analyst',
    department: 'Analytics',
  },
  {
    id: 9,
    koreanName: '한지우',
    englishName: 'Ji-woo Han',
    email: 'jiwoo.han@example.com',
    role: 'Customer Support',
    department: 'Customer Service',
  },
  {
    id: 10,
    koreanName: '송민서',
    englishName: 'Min-seo Song',
    email: 'minseo.song@example.com',
    role: 'QA Engineer',
    department: 'Engineering',
  },
  {
    id: 11,
    koreanName: '오현우',
    englishName: 'Hyun-woo Oh',
    email: 'hyunwoo.oh@example.com',
    role: 'Manager',
    department: 'Engineering',
  },
  {
    id: 12,
    koreanName: '신아영',
    englishName: 'A-young Shin',
    email: 'ayoung.shin@example.com',
    role: 'Developer',
    department: 'Engineering',
  },
  {
    id: 13,
    koreanName: '권태현',
    englishName: 'Tae-hyun Kwon',
    email: 'taehyun.kwon@example.com',
    role: 'Designer',
    department: 'Product',
  },
  {
    id: 14,
    koreanName: '황서진',
    englishName: 'Seo-jin Hwang',
    email: 'seojin.hwang@example.com',
    role: 'HR Specialist',
    department: 'Human Resources',
  },
  {
    id: 15,
    koreanName: '조은서',
    englishName: 'Eun-seo Cho',
    email: 'eunseo.cho@example.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
  },
  {
    id: 16,
    koreanName: '백승민',
    englishName: 'Seung-min Baek',
    email: 'seungmin.baek@example.com',
    role: 'Sales Representative',
    department: 'Sales',
  },
  {
    id: 17,
    koreanName: '유하은',
    englishName: 'Ha-eun Yoo',
    email: 'haeun.yoo@example.com',
    role: 'Product Manager',
    department: 'Product',
  },
  {
    id: 18,
    koreanName: '노준호',
    englishName: 'Jun-ho Noh',
    email: 'junho.noh@example.com',
    role: 'Data Analyst',
    department: 'Analytics',
  },
  {
    id: 19,
    koreanName: '김다은',
    englishName: 'Da-eun Kim',
    email: 'daeun.kim@example.com',
    role: 'Customer Support',
    department: 'Customer Service',
  },
  {
    id: 20,
    koreanName: '이태원',
    englishName: 'Tae-won Lee',
    email: 'taewon.lee@example.com',
    role: 'QA Engineer',
    department: 'Engineering',
  },
  {
    id: 21,
    koreanName: '박소율',
    englishName: 'So-yul Park',
    email: 'soyul.park@example.com',
    role: 'Manager',
    department: 'Marketing',
  },
  {
    id: 22,
    koreanName: '정윤서',
    englishName: 'Yoon-seo Jung',
    email: 'yoonseo.jung@example.com',
    role: 'Developer',
    department: 'Engineering',
  },
  {
    id: 23,
    koreanName: '최준영',
    englishName: 'Jun-young Choi',
    email: 'junyoung.choi@example.com',
    role: 'Designer',
    department: 'Product',
  },
  {
    id: 24,
    koreanName: '강서연',
    englishName: 'Seo-yeon Kang',
    email: 'seoyeon.kang@example.com',
    role: 'HR Specialist',
    department: 'Human Resources',
  },
  {
    id: 25,
    koreanName: '윤도현',
    englishName: 'Do-hyun Yoon',
    email: 'dohyun.yoon@example.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
  },
  {
    id: 26,
    koreanName: '임수아',
    englishName: 'Su-a Lim',
    email: 'sua.lim@example.com',
    role: 'Sales Representative',
    department: 'Sales',
  },
  {
    id: 27,
    koreanName: '한승우',
    englishName: 'Seung-woo Han',
    email: 'seungwoo.han@example.com',
    role: 'Product Manager',
    department: 'Product',
  },
  {
    id: 28,
    koreanName: '송지안',
    englishName: 'Ji-an Song',
    email: 'jian.song@example.com',
    role: 'Data Analyst',
    department: 'Analytics',
  },
  {
    id: 29,
    koreanName: '오태윤',
    englishName: 'Tae-yoon Oh',
    email: 'taeyoon.oh@example.com',
    role: 'Customer Support',
    department: 'Customer Service',
  },
  {
    id: 30,
    koreanName: '신유진',
    englishName: 'Yu-jin Shin',
    email: 'yujin.shin@example.com',
    role: 'QA Engineer',
    department: 'Engineering',
  },
];

interface InviteEmployeePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (
    koreanName: string,
    englishName: string,
    email: string,
    role: string,
    department: string
  ) => void;
  content: any;
}

const InviteEmployeePopup: React.FC<InviteEmployeePopupProps> = ({
  isOpen,
  onClose,
  onInvite,
  content,
}) => {
  const [koreanName, setKoreanName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInvite(koreanName, englishName, email, role, department);
    setKoreanName('');
    setEnglishName('');
    setEmail('');
    setRole('');
    setDepartment('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {content.inviteEmployee}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="koreanName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content.koreanName}
            </label>
            <input
              type="text"
              id="koreanName"
              value={koreanName}
              onChange={(e) => setKoreanName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="englishName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content.englishName}
            </label>
            <input
              type="text"
              id="englishName"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content.email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content.role}
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content.department}
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition duration-300 text-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            {content.sendInvitation}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// content 객체의 타입 정의를 수정
type ContentType = {
  [key in 'en' | 'ko']: {
    title: string;
    profile: string;
    notifications: string;
    security: string;
    language: string;
    save: string;
    googleAccount: string;
    notificationsEnabled: string;
    notificationsDisabled: string;
    twoFactor: string;
    enable: string;
    disable: string;
    employeeManagement: string;
    inviteEmployee: string;
    manageEmployees: string;
    searchEmployees: string;
    name: string;
    email: string;
    role: string;
    department: string;
    actions: string;
    sendInvitation: string;
    koreanName: string;
    englishName: string;
  };
};

const content: ContentType = {
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
    sendInvitation: 'Send Invitation',
    koreanName: 'Korean Name',
    englishName: 'English Name',
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
    sendInvitation: '초대 보내기',
    koreanName: '한국어 이름',
    englishName: '영어 이름',
  },
};

export default function Settings() {
  const { language, setLanguage } = useLanguage() as {
    language: 'en' | 'ko';
    setLanguage: (lang: 'en' | 'ko') => void;
  };
  const [notifications, setNotifications] = useState(true);
  const [userName, setUserName] = useState('Demo User');
  const [userEmail, setUserEmail] = useState('demo@example.com');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [employees, setEmployees] = useState(dummyEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);
  const router = useRouter();

  const content: ContentType = {
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
      sendInvitation: 'Send Invitation',
      koreanName: 'Korean Name',
      englishName: 'English Name',
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
      sendInvitation: '초대 보내기',
      koreanName: '한국어 이름',
      englishName: '영어 이름',
    },
  };

  useEffect(() => {
    // 데모 목적으로 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  function HandleSearchParams() {
    const searchParams = useSearchParams();

    useEffect(() => {
      // URL 파라미터에서 섹션 확인
      const section = searchParams?.get('section');
      if (section === 'employee-management') {
        setActiveTab('employeeManagement');
      }
    }, [searchParams]);

    return null;
  }

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

  const handleInviteEmployee = (
    email: string,
    role: string,
    department: string
  ) => {
    console.log(
      `Inviting employee: ${email}, Role: ${role}, Department: ${department}`
    );
    // 여기에 실제 초대 로직을 구현할 수 있습니다.
    setIsInvitePopupOpen(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'createSurvey':
        router.push('/surveys/create');
        break;
      case 'inviteEmployees':
        router.push('/settings?section=employee-management');
        break;
      case 'viewLatestResults':
        router.push('/surveys/results');
        break;
      default:
        console.error('Unknown action:', action);
    }
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
        <button
          onClick={() => setIsInvitePopupOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 flex items-center shadow-md"
        >
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
                  employee.koreanName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  employee.englishName
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
                    {employee.koreanName} ({employee.englishName})
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
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-gray-800"
      >
        {content[language].title}
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
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
                className={`w-full text-left py-2 px-4 rounded-md mb-2 transition duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {
                  (content[language] as Record<string, string>)[
                    tab as keyof (typeof content)[typeof language]
                  ]
                }
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-3/4">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <UserIcon className="h-6 w-6 mr-2 text-blue-500" />
                {content[language].profile}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {content[language].googleAccount}
                  </label>
                  <input
                    type="text"
                    value={userEmail}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {content[language].name}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <BellIcon className="h-6 w-6 mr-2 text-blue-500" />
                {content[language].notifications}
              </h2>
              <div className="flex items-center">
                <button
                  onClick={handleNotificationsChange}
                  className={`px-4 py-2 rounded-md text-white font-medium transition duration-300 ${
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
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-500" />
                {content[language].security}
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {content[language].twoFactor}
                </label>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md">
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
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <GlobeAltIcon className="h-6 w-6 mr-2 text-blue-500" />
                {content[language].language}
              </h2>
              <div className="flex items-center space-x-4">
                {['en', 'ko'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang as 'en' | 'ko')}
                    className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
                      language === lang
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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
        className="mt-8 text-right"
      >
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium text-sm shadow-sm hover:bg-blue-600 transition duration-300"
        >
          {content[language].save}
        </button>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
        <Suspense fallback={<LoadingSpinner />}>
          <SearchParamsWrapper>
            <HandleSearchParams />
            {renderContent()}
          </SearchParamsWrapper>
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
