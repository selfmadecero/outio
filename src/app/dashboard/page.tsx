'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import {
  ChartPieIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const content = {
  en: {
    welcomeMessage: 'Welcome back',
    cultureProfile: 'Culture Profile',
    cultureProfileDesc: "View and analyze your organization's culture",
    hiring: 'Hiring',
    hiringDesc: 'Find candidates that match your culture',
    surveys: 'Surveys',
    surveysDesc: 'Create and manage culture surveys',
    trends: 'Culture Trends',
    trendsDesc: 'Track changes in your organizational culture',
    insights: 'AI Insights',
    insightsDesc: 'Get AI-powered recommendations for your culture',
    feedback: 'Employee Feedback',
    feedbackDesc: 'View and respond to employee feedback',
    quickActions: 'Quick Actions',
    createSurvey: 'Create New Survey',
    inviteEmployees: 'Invite Employees',
    viewLatestResults: 'View Latest Survey Results',
    cultureScore: 'Culture Score',
    employeeEngagement: 'Employee Engagement',
    innovationIndex: 'Innovation Index',
    collaborationIndex: 'Collaboration Index',
  },
  ko: {
    welcomeMessage: '다시 오신 것을 환영합니다',
    cultureProfile: '문화 프로필',
    cultureProfileDesc: '조직의 문화를 확인하고 분석하세요',
    hiring: '채용',
    hiringDesc: '귀사의 문화에 맞는 후보자를 찾으세요',
    surveys: '설문조사',
    surveysDesc: '문화 설문조사를 생성하고 관리하세요',
    trends: '문화 트렌드',
    trendsDesc: '조직 문화의 변화를 추적하세요',
    insights: 'AI 인사이트',
    insightsDesc: 'AI 기반 문화 개선 추천을 받으세요',
    feedback: '직원 피드백',
    feedbackDesc: '직원 피드백을 확인하고 응답하세요',
    quickActions: '빠른 작업',
    createSurvey: '새 설문조사 만들기',
    inviteEmployees: '직원 초대하기',
    viewLatestResults: '최신 설문 결과 보기',
    cultureScore: '문화 점수',
    employeeEngagement: '직원 참여도',
    innovationIndex: '혁신 지수',
    collaborationIndex: '협업 지수',
  },
};

const Dashboard = () => {
  const { language } = useLanguage();
  const [userName, setUserName] = useState('');
  const [cultureScore, setCultureScore] = useState(0);
  const [employeeEngagement, setEmployeeEngagement] = useState(0);
  const [innovationIndex, setInnovationIndex] = useState(0);
  const [collaborationIndex, setCollaborationIndex] = useState(0);

  useEffect(() => {
    // 여기서 실제 데이터를 가져오는 API 호출을 수행합니다.
    setUserName('김지영');
    setCultureScore(78);
    setEmployeeEngagement(82);
    setInnovationIndex(75);
    setCollaborationIndex(80);
  }, []);

  const renderCard = (
    icon: React.ReactNode,
    title: string,
    description: string,
    link: string
  ) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start space-y-4 cursor-pointer"
      onClick={() => (window.location.href = link)}
    >
      <div className="p-3 bg-indigo-100 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  const renderMetric = (title: string, value: number, color: string) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className={`text-4xl font-bold ${color}`}>{value}%</div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-8"
        >
          {content[language].welcomeMessage}, {userName}!
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {renderCard(
            <ChartPieIcon className="h-8 w-8 text-indigo-600" />,
            content[language].cultureProfile,
            content[language].cultureProfileDesc,
            '/culture-profile'
          )}
          {renderCard(
            <UserGroupIcon className="h-8 w-8 text-indigo-600" />,
            content[language].hiring,
            content[language].hiringDesc,
            '/hiring'
          )}
          {renderCard(
            <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-600" />,
            content[language].surveys,
            content[language].surveysDesc,
            '/surveys'
          )}
          {renderCard(
            <ArrowTrendingUpIcon className="h-8 w-8 text-indigo-600" />,
            content[language].trends,
            content[language].trendsDesc,
            '/trends'
          )}
          {renderCard(
            <LightBulbIcon className="h-8 w-8 text-indigo-600" />,
            content[language].insights,
            content[language].insightsDesc,
            '/insights'
          )}
          {renderCard(
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-600" />,
            content[language].feedback,
            content[language].feedbackDesc,
            '/feedback'
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {content[language].quickActions}
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
              {content[language].createSurvey}
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
              {content[language].inviteEmployees}
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              {content[language].viewLatestResults}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {renderMetric(
            content[language].cultureScore,
            cultureScore,
            'text-indigo-600'
          )}
          {renderMetric(
            content[language].employeeEngagement,
            employeeEngagement,
            'text-green-600'
          )}
          {renderMetric(
            content[language].innovationIndex,
            innovationIndex,
            'text-purple-600'
          )}
          {renderMetric(
            content[language].collaborationIndex,
            collaborationIndex,
            'text-blue-600'
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
