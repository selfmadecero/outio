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
import OnboardingPopup from '../../components/OnboardingPopup';
import OnboardingButton from '../../components/OnboardingButton';
import { auth } from '../../firebase'; // Firebase auth 임포트
import { User } from 'firebase/auth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// content 객체의 타입 정의
type ContentType = {
  en: {
    welcomeMessage: string;
    cultureProfile: string;
    cultureProfileDesc: string;
    hiring: string;
    hiringDesc: string;
    surveys: string;
    surveysDesc: string;
    insights: string;
    insightsDesc: string;
    feedback: string;
    feedbackDesc: string;
    quickActions: string;
    createSurvey: string;
    inviteEmployees: string;
    viewLatestResults: string;
    cultureScore: string;
    employeeEngagement: string;
    innovationIndex: string;
    collaborationIndex: string;
    increase: string;
    decrease: string;
    noChange: string;
    from: string;
    keyInsights: string;
    recentFeedback: string;
    goalProgress: string;
    goalProgressDescription: string;
    goalProgressExplanation: string;
    recommendations: string;
    industryComparison: string;
    settings: string;
    settingsDesc: string;
    yourCompany: string;
    industryAverage: string;
    comparisonInsight: string;
    aboveAverage: string;
    belowAverage: string;
    atAverage: string;
  };
  ko: {
    welcomeMessage: string;
    cultureProfile: string;
    cultureProfileDesc: string;
    hiring: string;
    hiringDesc: string;
    surveys: string;
    surveysDesc: string;
    insights: string;
    insightsDesc: string;
    feedback: string;
    feedbackDesc: string;
    quickActions: string;
    createSurvey: string;
    inviteEmployees: string;
    viewLatestResults: string;
    cultureScore: string;
    employeeEngagement: string;
    innovationIndex: string;
    collaborationIndex: string;
    increase: string;
    decrease: string;
    noChange: string;
    from: string;
    keyInsights: string;
    recentFeedback: string;
    goalProgress: string;
    goalProgressDescription: string;
    goalProgressExplanation: string;
    recommendations: string;
    industryComparison: string;
    settings: string;
    settingsDesc: string;
    yourCompany: string;
    industryAverage: string;
    comparisonInsight: string;
    aboveAverage: string;
    belowAverage: string;
    atAverage: string;
  };
};

const content: ContentType = {
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
    yourCompany: 'Your Company',
    industryAverage: 'Industry Average',
    comparisonInsight:
      'Your company is performing {performance} the industry average in {category}.',
    aboveAverage: 'above',
    belowAverage: 'below',
    atAverage: 'at',
  },
  ko: {
    welcomeMessage: '다시 오신 것을 환영합니다',
    cultureProfile: '문화 프로필',
    cultureProfileDesc: '조직의 문화를 확인하고 분석하세요',
    hiring: '채용',
    hiringDesc: '귀사의 문화에 맞는 후보자를 찾으세요',
    surveys: '설문조',
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
    yourCompany: '우리 회사',
    industryAverage: '산업 평균',
    comparisonInsight:
      '귀사는 {category} 부문에서 산업 평균 {performance} 수준입니다.',
    aboveAverage: '보다 높은',
    belowAverage: '보다 낮은',
    atAverage: '과 동일한',
  },
};

interface MetricData {
  current: number;
  previous: number;
}

const Dashboard = () => {
  const router = useRouter();
  const { language } = useLanguage() as { language: 'en' | 'ko' };
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

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserName(user.displayName || '사용자');

        // 로컬 스토리지에서 온보딩 완료 여부 확인
        const hasCompletedOnboarding = localStorage.getItem(
          'hasCompletedOnboarding'
        );

        if (!hasCompletedOnboarding) {
          setShowOnboarding(true);
          localStorage.setItem('hasCompletedOnboarding', 'true');
        }
      } else {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      // 여기서 실제 데이터를 가져오는 API 호출을 수행합니다.
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
        en: [
          'Implement weekly team meetings',
          'Start cross-functional projects',
        ],
        ko: ['주간 팀 미팅 도입', '부서 간 협업 프로젝트 시작'],
      });
      setIndustryComparison({ cultureScore: 5, employeeEngagement: -2 });
    }
  }, [user]);

  useEffect(() => {
    // 설정 페이지 프리페치
    router.prefetch('/settings');
  }, [router]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

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

  const renderIndustryComparison = () => {
    const { language } = useLanguage();
    const t = content[language as keyof typeof content];

    const data = [
      {
        category: t.cultureScore,
        yourCompany: 75,
        industryAverage: 65,
      },
      {
        category: t.employeeEngagement,
        yourCompany: 82,
        industryAverage: 70,
      },
      {
        category: t.innovationIndex,
        yourCompany: 78,
        industryAverage: 72,
      },
      {
        category: t.collaborationIndex,
        yourCompany: 80,
        industryAverage: 68,
      },
    ];

    const getPerformanceText = (yourScore: number, avgScore: number) => {
      if (yourScore > avgScore) return t.aboveAverage;
      if (yourScore < avgScore) return t.belowAverage;
      return t.atAverage;
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <BuildingLibraryIcon className="h-7 w-7 mr-2 text-indigo-600" />
          {t.industryComparison}
        </h3>
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="relative bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                {item.category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({t.yourCompany}: {item.yourCompany}% | {t.industryAverage}:{' '}
                  {item.industryAverage}%)
                </span>
              </h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                      {t.yourCompany}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {item.yourCompany}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <div
                    style={{ width: `${item.yourCompany}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  ></div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                      {t.industryAverage}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {item.industryAverage}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${item.industryAverage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {t.comparisonInsight
                  .replace(
                    '{performance}',
                    getPerformanceText(item.yourCompany, item.industryAverage)
                  )
                  .replace('{category}', item.category.toLowerCase())}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    );
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
        console.error('알 수 없는 작업:', action);
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

      {showOnboarding && (
        <OnboardingPopup onClose={handleCloseOnboarding} language={language} />
      )}

      <OnboardingButton
        onClick={() => setShowOnboarding(true)}
        language={language}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
