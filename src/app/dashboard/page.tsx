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
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  FlagIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const content = {
  en: {
    welcomeMessage: 'Welcome back',
    cultureProfile: 'Culture Profile',
    cultureProfileDesc: "View and analyze your organization's culture",
    hiring: 'Hiring',
    hiringDesc: 'Find candidates that match your culture',
    surveys: 'Surveys',
    surveysDesc: 'Create and manage culture surveys',
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
    increase: 'Increase',
    decrease: 'Decrease',
    noChange: 'No change',
    from: 'from last month',
    keyInsights: 'Key Insights',
    recentFeedback: 'Recent Feedback',
    goalProgress: 'Culture Goal Progress',
    goalProgressDescription:
      "Track progress towards your organization's cultural goals",
    goalProgressExplanation:
      'This represents the overall progress towards the cultural goals set by your organization. It is calculated based on various metrics including employee engagement, innovation index, and collaboration index.',
    recommendations: 'Recommendations',
    industryComparison: 'Industry Comparison',
    settings: 'Settings',
    settingsDesc: 'Manage your account and app settings',
  },
  ko: {
    welcomeMessage: '다시 오신 것을 환영합니다',
    cultureProfile: '문화 프로필',
    cultureProfileDesc: '조직의 문화를 확인하고 분석하세요',
    hiring: '채용',
    hiringDesc: '귀사의 문화에 맞는 후보자를 찾으세요',
    surveys: '설문조��',
    surveysDesc: '문화 설문조사를 생성하고 관리하세요',
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
    increase: '증가',
    decrease: '감소',
    noChange: '변화 없음',
    from: '지난 달 대비',
    keyInsights: '주요 인사이트',
    recentFeedback: '최근 피드백',
    goalProgress: '문화 목표 진행 상황',
    goalProgressDescription: '조직의 문화 목표 달성 진행 상황을 추적합니다',
    goalProgressExplanation:
      '이는 조직이 설정한 문화 목표에 대한 전반적인 진행 상황을 나타냅니다. 직원 참여도, 혁신 지수, 협업 지수 등 다양한 지표를 기반으로 계산됩니다.',
    recommendations: '추천 사항',
    industryComparison: '산업 평균 비교',
    settings: '설정',
    settingsDesc: '계정 및 앱 설정을 관리하세요',
  },
};

interface MetricData {
  current: number;
  previous: number;
}

const Dashboard = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [userName, setUserName] = useState('');
  const [cultureScore, setCultureScore] = useState<MetricData>({
    current: 0,
    previous: 0,
  });
  const [employeeEngagement, setEmployeeEngagement] = useState<MetricData>({
    current: 0,
    previous: 0,
  });
  const [innovationIndex, setInnovationIndex] = useState<MetricData>({
    current: 0,
    previous: 0,
  });
  const [collaborationIndex, setCollaborationIndex] = useState<MetricData>({
    current: 0,
    previous: 0,
  });

  const [keyInsights, setKeyInsights] = useState<{
    en: string[];
    ko: string[];
  }>({
    en: [],
    ko: [],
  });
  const [recentFeedback, setRecentFeedback] = useState<{
    en: string[];
    ko: string[];
  }>({
    en: [],
    ko: [],
  });
  const [goalProgress, setGoalProgress] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<{
    en: string[];
    ko: string[];
  }>({
    en: [],
    ko: [],
  });
  const [industryComparison, setIndustryComparison] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    // 여기서 실제 데이터를 가져오는 API 호출을 수행니다.
    setUserName('김지영');
    setCultureScore({ current: 78, previous: 75 });
    setEmployeeEngagement({ current: 82, previous: 80 });
    setInnovationIndex({ current: 75, previous: 77 });
    setCollaborationIndex({ current: 80, previous: 76 });

    setKeyInsights({
      en: [
        'Innovation index increased',
        'Team collaboration needs improvement',
      ],
      ko: ['혁신 지수 상승', '팀 협업 개선 필요'],
    });
    setRecentFeedback({
      en: [
        'Anonymous: Request for remote work expansion',
        'Anonymous: Suggestion for mentoring program',
      ],
      ko: ['익명: 재택근무 확대 요청', '익명: 멘토링 프로그램 제안'],
    });
    setGoalProgress(65);
    setRecommendations({
      en: ['Implement weekly team meetings', 'Start cross-functional projects'],
      ko: ['주간 팀 미팅 도입', '부서 간 협업 프로젝트 시작'],
    });
    setIndustryComparison({ cultureScore: 5, employeeEngagement: -2 });
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
      onClick={() => router.push(link)}
    >
      <div className="p-3 bg-indigo-100 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const renderMetric = (title: string, data: MetricData, color: string) => {
    const change = calculateChange(data.current, data.previous);
    const isIncrease = data.current > data.previous;
    const isDecrease = data.current < data.previous;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className={`text-4xl font-bold ${color} mb-2`}>
          {data.current}%
        </div>
        <div className="flex items-center text-sm">
          {isIncrease && (
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
          )}
          {isDecrease && (
            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={
              isIncrease
                ? 'text-green-500'
                : isDecrease
                ? 'text-red-500'
                : 'text-gray-500'
            }
          >
            {change}%{' '}
            {isIncrease
              ? content[language].increase
              : isDecrease
              ? content[language].decrease
              : content[language].noChange}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {content[language].from}
        </div>
      </div>
    );
  };

  const renderInsights = () => (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <SparklesIcon className="h-6 w-6 mr-2 text-yellow-500" />
        {content[language].keyInsights}
      </h2>
      <ul className="list-disc list-inside">
        {keyInsights[language].map((insight, index) => (
          <li key={index} className="text-gray-600">
            {insight}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const renderRecentFeedback = () => (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2 text-purple-500" />
        {content[language].recentFeedback}
      </h2>
      <ul className="space-y-2">
        {recentFeedback[language].map((feedback, index) => (
          <li key={index} className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-purple-500" />
            <span className="text-gray-600">{feedback}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const renderGoalProgress = () => (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FlagIcon className="h-6 w-6 mr-2 text-green-500" />
        {content[language].goalProgress}
      </h2>
      <p className="text-gray-600 mb-4">
        {content[language].goalProgressDescription}
      </p>
      <div className="flex items-center mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${goalProgress}%` }}
          ></div>
        </div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
          {goalProgress}%
        </span>
      </div>
      <div className="flex items-start text-sm text-gray-500">
        <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <p>{content[language].goalProgressExplanation}</p>
      </div>
    </motion.div>
  );

  const renderRecommendations = () => (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-500" />
        {content[language].recommendations}
      </h2>
      <ul className="list-disc list-inside">
        {recommendations[language].map((recommendation, index) => (
          <li key={index} className="text-gray-600">
            {recommendation}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const renderIndustryComparison = () => (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <BuildingLibraryIcon className="h-6 w-6 mr-2 text-blue-500" />
        {content[language].industryComparison}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(industryComparison).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <span className="text-gray-600 mr-2">{key}:</span>
            <span
              className={`${
                value > 0
                  ? 'text-green-500'
                  : value < 0
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}
            >
              {value > 0 ? `+${value}%` : `${value}%`}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {content[language].quickActions}
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={() => handleQuickAction('createSurvey')}
            >
              {content[language].createSurvey}
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => handleQuickAction('inviteEmployees')}
            >
              {content[language].inviteEmployees}
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              onClick={() => handleQuickAction('viewLatestResults')}
            >
              {content[language].viewLatestResults}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                <CogIcon className="h-8 w-8 text-indigo-600" />,
                content[language].settings,
                content[language].settingsDesc,
                '/settings'
              )}
            </div>
            {renderGoalProgress()}
          </div>
          <div className="space-y-8">
            {renderInsights()}
            {renderRecentFeedback()}
            {renderRecommendations()}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

        {renderIndustryComparison()}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
