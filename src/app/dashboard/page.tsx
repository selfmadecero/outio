'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../../firebase';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [companyProfile, setCompanyProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (user) {
        const docRef = doc(db, 'companies', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCompanyProfile(docSnap.data());
        }
      }
    };
    fetchCompanyProfile();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
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
      hiring: 'Hiring',
      settings: 'Settings',
      signOut: 'Sign Out',
      welcome: 'Welcome',
      viewProfile: 'View Profile',
      startSurvey: 'Start Survey',
      viewRecommendations: 'View Recommendations',
      recentActivity: 'Recent Activity',
      noActivity: 'No recent activity to display.',
    },
    ko: {
      dashboard: '대시보드',
      cultureProfile: '문화 프로필',
      hiring: '채용',
      settings: '설정',
      signOut: '로그아웃',
      welcome: '환영합니다',
      viewProfile: '프로필 보기',
      startSurvey: '설문 시작',
      viewRecommendations: '추천 보기',
      recentActivity: '최근 활동',
      noActivity: '표시할 최근 활동이 없습니다.',
    },
  };

  const menuItems = [
    { name: content[language].dashboard, icon: HomeIcon, href: '/dashboard' },
    {
      name: content[language].cultureProfile,
      icon: ChartBarIcon,
      href: '/dashboard/culture',
    },
    {
      name: content[language].hiring,
      icon: UserGroupIcon,
      href: '/dashboard/hiring',
    },
    {
      name: content[language].settings,
      icon: Cog6ToothIcon,
      href: '/dashboard/settings',
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-64 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
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
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-r-4 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <item.icon
                className={`h-6 w-6 ${
                  pathname === item.href ? 'text-blue-500' : ''
                }`}
              />
              <span className="mx-3 font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg border-b border-gray-200">
          <div className="h-full flex justify-between items-center px-6">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-2xl font-semibold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                {content[language].dashboard}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-full text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
              >
                <LanguageIcon className="h-5 w-5 mr-2" />
                {language === 'en' ? '한국어' : 'English'}
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                {content[language].signOut}
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-2xl font-medium mb-6">
              {content[language].welcome}, {user.displayName}
            </h3>

            {companyProfile ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Culture Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                      <ChartBarIcon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="ml-4 text-lg font-semibold text-gray-700">
                      {content[language].cultureProfile}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'en'
                      ? "View your organization's culture profile"
                      : '조직의 문화 프로필 보기'}
                  </p>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                    {content[language].viewProfile}
                  </button>
                </div>

                {/* New Survey Card */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600">
                      <UserGroupIcon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="ml-4 text-lg font-semibold text-gray-700">
                      {language === 'en' ? 'New Survey' : '새 설문'}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'en'
                      ? 'Create a new culture diagnosis survey'
                      : '새로운 문화 진단 설문 만들기'}
                  </p>
                  <Link
                    href="/survey/create"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 inline-block text-center"
                  >
                    {language === 'en' ? 'Create Survey' : '설문 만들기'}
                  </Link>
                </div>

                {/* Hiring Recommendations Card */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                      <Cog6ToothIcon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="ml-4 text-lg font-semibold text-gray-700">
                      {language === 'en'
                        ? 'Hiring Recommendations'
                        : '채용 추천'}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'en'
                      ? 'View tailored hiring recommendations'
                      : '맞춤형 채용 추천 보기'}
                  </p>
                  <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300">
                    {content[language].viewRecommendations}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-4">
                  {language === 'en'
                    ? "Let's set up your company profile first!"
                    : '먼저 회사 프로필을 설정해 주세요!'}
                </p>
                <Link
                  href="/company-profile"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  {language === 'en' ? 'Set Up Profile' : '프로필 설정'}
                </Link>
              </div>
            )}

            {/* Recent Activity Section */}
            <div className="mt-12">
              <h4 className="text-2xl font-semibold text-gray-700 mb-4">
                {content[language].recentActivity}
              </h4>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-500">{content[language].noActivity}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
