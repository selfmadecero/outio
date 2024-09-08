'use client';

import React from 'react';
import { useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  BellIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import AuthButton from './AuthButton';
import WaitlistPopup from './WaitlistPopup';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [isWaitlistPopupOpen, setIsWaitlistPopupOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (!user && !loading) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return <div>Loading...</div>;
  }

  // 사용자가 인증되지 않았을 때 처리
  if (!user) {
    return null; // 또는 로그인 페이지로 리다이렉트
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const content = {
    en: {
      dashboard: 'Dashboard',
      cultureProfile: 'Culture Profile',
      surveys: 'Surveys', // 'survey'를 'surveys'로 변경
      hiring: 'Hiring',
      feedback: 'Feedback',
      settings: 'Settings',
      signOut: 'Sign Out',
      demo: 'Demo Version',
      joinWaitlist: 'Join Waitlist',
      demoAlert: 'You are currently viewing a demo version.',
      joinWaitlistCTA:
        'Join our waitlist for early access to the full version!',
    },
    ko: {
      dashboard: '대시보드',
      cultureProfile: '문화 프로필',
      surveys: '설문조사', // 'survey'를 '설문조사'로 변경 (이미 올바르게 되어 있다면 그대로 두세요)
      hiring: '채용',
      feedback: '피드백',
      settings: '설정',
      signOut: '로그아웃',
      demo: '데모 버전',
      joinWaitlist: '웨이트리스트 등록',
      demoAlert: '현재 데모 버전을 보고 계십니다.',
      joinWaitlistCTA:
        '정식 버전 얼리 액세스를 위해 웨이트리스트에 등록하세요!',
    },
  };

  const menuItems = [
    { name: content[language].dashboard, icon: HomeIcon, href: '/dashboard' },
    {
      name: content[language].cultureProfile,
      icon: ChartBarIcon,
      href: '/culture-profile',
    },
    {
      name: content[language].surveys, // 'survey'를 'surveys'로 변경
      icon: ClipboardDocumentCheckIcon,
      href: '/surveys', // '/survey'를 '/surveys'로 변경
    },
    {
      name: content[language].hiring,
      icon: UserGroupIcon,
      href: '/hiring',
    },
    {
      name: content[language].feedback,
      icon: ChatBubbleLeftRightIcon,
      href: '/feedback',
    },
    {
      name: content[language].settings,
      icon: Cog6ToothIcon,
      href: '/settings',
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openWaitlistPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistPopupOpen(true);
  };

  const closeWaitlistPopup = () => {
    setIsWaitlistPopupOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Demo Alert Banner */}
      <div className="bg-yellow-500 text-white py-2 px-4 text-center">
        <p className="text-sm font-medium">
          {content[language].demoAlert}{' '}
          <a
            href="#"
            onClick={openWaitlistPopup}
            className="underline font-bold hover:text-yellow-200 transition-colors duration-300"
          >
            {content[language].joinWaitlistCTA}
          </a>
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-64 bg-white shadow-lg">
          <SidebarContent
            menuItems={menuItems}
            pathname={pathname || ''}
            language={language}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="h-16 bg-white border-b border-gray-200">
            <div className="h-full flex justify-between items-center px-4 md:px-6">
              <div className="flex items-center">
                <button
                  className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
                  onClick={toggleSidebar}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <span className="text-sm font-medium text-gray-500 hidden sm:inline">
                  {content[language].demo}
                </span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <button
                  onClick={openWaitlistPopup}
                  className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 border border-transparent text-xs md:text-sm font-medium rounded-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 animate-pulse"
                >
                  <BellIcon className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">
                    {content[language].joinWaitlist}
                  </span>
                </button>
                <LanguageSelector onChange={() => {}} />
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-2 py-1 md:px-3 md:py-2 border border-transparent text-xs md:text-sm leading-4 font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">
                    {content[language].signOut}
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
            {children}
          </main>
        </div>
      </div>

      {/* Floating Waitlist Button (모바일에서만 표시) */}
      <div className="md:hidden fixed bottom-4 right-4">
        <button
          onClick={openWaitlistPopup}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 shadow-lg hover:shadow-xl"
        >
          <BellIcon className="h-5 w-5 mr-2" />
          {content[language].joinWaitlist}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        ></div>
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleSidebar}
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent
            menuItems={menuItems}
            pathname={pathname || ''}
            language={language}
          />
        </div>
      </div>

      {/* Waitlist Popup */}
      <WaitlistPopup
        isOpen={isWaitlistPopupOpen}
        onClose={closeWaitlistPopup}
        language={language}
      />
    </div>
  );
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarContentProps {
  menuItems: MenuItem[];
  pathname: string;
  language: 'en' | 'ko';
}

function SidebarContent({
  menuItems,
  pathname,
  language,
}: SidebarContentProps) {
  return (
    <>
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link
          href="/dashboard"
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-80 transition duration-300"
        >
          Outio
        </Link>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center py-3 px-6 transition duration-300 ${
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-r-4 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <item.icon
              className={`h-6 w-6 ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? 'text-blue-500'
                  : ''
              }`}
            />
            <span className="mx-3 font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
