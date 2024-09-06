'use client';

import { SurveyManagement } from '../../components/SurveyManagement';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../../firebase';
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
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import DashboardLayout from '../../components/DashboardLayout';

interface CompanyProfile {
  name?: string;
  industry?: string;
  employeeCount?: number;
  // 필요한 다른 필드들을 여기에 추가하세요
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchCompanyProfile(user.uid);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchCompanyProfile = async (userId: string) => {
    const docRef = doc(db, 'companies', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCompanyProfile(docSnap.data() as CompanyProfile);
    }
  };

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
      survey: 'Survey',
      hiring: 'Hiring',
      feedback: 'Feedback',
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
      survey: '설문조사',
      hiring: '채용',
      feedback: '피드백',
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
      href: '/culture-profile',
    },
    {
      name: content[language].survey,
      icon: UserGroupIcon,
      href: '/survey/create',
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

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-2xl font-medium mb-6">
          {content[language].welcome}, {user?.displayName}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Link
              href="/culture-profile"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 inline-block text-center"
            >
              {content[language].viewProfile}
            </Link>
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
              {content[language].startSurvey}
            </Link>
          </div>

          {/* Hiring Recommendations Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h4 className="ml-4 text-lg font-semibold text-gray-700">
                {language === 'en' ? 'Interview Questions' : '면접 질문'}
              </h4>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'en'
                ? 'Generate culture-fit interview questions'
                : '문화 적합성 면접 질문 생성'}
            </p>
            <Link
              href="/hiring" // '/interview-questions'에서 변경
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300 inline-block text-center"
            >
              {content[language].viewRecommendations}
            </Link>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">
            {content[language].recentActivity}
          </h4>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-500">{content[language].noActivity}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
