'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';

// 더미 데이터
const dummyCompanyProfile = {
  name: { en: 'TechInnovate Inc.', ko: '테크이노베이트' },
  cultureScore: { value: 78, change: 5 },
  employeeCount: { value: 250, change: 10 },
  surveyCompletion: { value: 85, change: -2 },
};

const dummyRecentActivities = {
  en: [
    { id: 1, action: 'New survey created', date: '2023-06-01' },
    { id: 2, action: 'Culture report generated', date: '2023-05-28' },
    { id: 3, action: 'New employee onboarded', date: '2023-05-25' },
  ],
  ko: [
    { id: 1, action: '새 설문조사 생성됨', date: '2023-06-01' },
    { id: 2, action: '문화 보고서 생성됨', date: '2023-05-28' },
    { id: 3, action: '신규 직원 온보딩 완료', date: '2023-05-25' },
  ],
};

const dummyCultureInsights = {
  en: [
    {
      id: 1,
      insight: 'Communication patterns show increased collaboration',
      importance: 'High',
    },
    {
      id: 2,
      insight: 'Employee satisfaction improved by 12% this quarter',
      importance: 'Medium',
    },
    {
      id: 3,
      insight: 'Leadership style aligns well with company values',
      importance: 'High',
    },
  ],
  ko: [
    { id: 1, insight: '의사소통 패턴에서 협업 증가 확인', importance: '높음' },
    { id: 2, insight: '이번 분기 직원 만족도 12% 향상', importance: '중간' },
    {
      id: 3,
      insight: '리더십 스타일이 회사 가치와 잘 부합',
      importance: '높음',
    },
  ],
};

const dummyUpcomingSurveys = {
  en: [
    { id: 1, name: 'Q2 Pulse Survey', date: '2023-06-15' },
    { id: 2, name: 'Leadership Evaluation', date: '2023-06-30' },
  ],
  ko: [
    { id: 1, name: '2분기 펄스 설문조사', date: '2023-06-15' },
    { id: 2, name: '리더십 평가', date: '2023-06-30' },
  ],
};

const dummyTeamFeedback = {
  en: [
    {
      id: 1,
      message: 'Great teamwork on the latest project!',
      from: 'Sarah K.',
    },
    {
      id: 2,
      message: 'Communication could be improved in our department.',
      from: 'Mike L.',
    },
  ],
  ko: [
    {
      id: 1,
      message: '최근 프로젝트에서 팀워크가 훌륭했습니다!',
      from: '사라 K.',
    },
    {
      id: 2,
      message: '우리 부서의 의사소통이 개선될 필요가 있습니다.',
      from: '마이크 L.',
    },
  ],
};

export default function Dashboard() {
  const { language } = useLanguage();
  const [companyProfile] = useState(dummyCompanyProfile);

  const content = {
    en: {
      welcome: 'Welcome back',
      cultureScore: 'Culture Score',
      employees: 'Employees',
      surveyCompletion: 'Survey Completion',
      cultureInsights: 'Culture Insights',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      createSurvey: 'Create New Survey',
      viewReports: 'View Reports',
      action: 'Action',
      date: 'Date',
      insight: 'Insight',
      importance: 'Importance',
      upcomingSurveys: 'Upcoming Surveys',
      teamFeedback: 'Recent Team Feedback',
      viewSurvey: 'View Survey',
      respondToFeedback: 'Respond',
    },
    ko: {
      welcome: '환영합니다',
      cultureScore: '문화 점수',
      employees: '직원 수',
      surveyCompletion: '설문 완료율',
      cultureInsights: '문화 인사이트',
      recentActivity: '최근 활동',
      viewAll: '전체 보기',
      createSurvey: '새 설문 만들기',
      viewReports: '보고서 보기',
      action: '활동',
      date: '날짜',
      insight: '인사이트',
      importance: '중요도',
      upcomingSurveys: '예정된 설문조사',
      teamFeedback: '최근 팀 피드백',
      viewSurvey: '설문 보기',
      respondToFeedback: '응답하기',
    },
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-8 text-white">
          {content[language].welcome}, {companyProfile.name[language]}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: content[language].cultureScore,
              value: companyProfile.cultureScore.value,
              change: companyProfile.cultureScore.change,
              icon: ChartBarIcon,
              color: 'blue',
            },
            {
              title: content[language].employees,
              value: companyProfile.employeeCount.value,
              change: companyProfile.employeeCount.change,
              icon: UserGroupIcon,
              color: 'purple',
            },
            {
              title: content[language].surveyCompletion,
              value: `${companyProfile.surveyCompletion.value}%`,
              change: companyProfile.surveyCompletion.change,
              icon: ClipboardDocumentListIcon,
              color: 'green',
            },
            {
              title: content[language].cultureInsights,
              value: `${dummyCultureInsights[language].length} ${
                language === 'en' ? 'New' : '새로운'
              }`,
              change: 0,
              icon: ArrowTrendingUpIcon,
              color: 'yellow',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-full bg-${item.color}-500 bg-opacity-20`}
                >
                  <item.icon className={`h-8 w-8 text-${item.color}-400`} />
                </div>
              </div>
              {item.change !== 0 && (
                <div
                  className={`flex items-center ${
                    item.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {item.change > 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {Math.abs(item.change)}
                    {item.title === content[language].surveyCompletion
                      ? '%p'
                      : ''}
                    {language === 'en' ? ' from last month' : ' 지난달 대비'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity and Culture Insights sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <ClipboardDocumentListIcon className="h-7 w-7 mr-3 text-blue-400" />
              {content[language].recentActivity}
            </h2>
            <div className="space-y-4">
              {dummyRecentActivities[language].map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-4"
                >
                  <span className="text-gray-300 text-lg">
                    {activity.action}
                  </span>
                  <span className="text-gray-400 text-sm">{activity.date}</span>
                </div>
              ))}
            </div>
            <Link
              href="/activities"
              className="text-blue-400 hover:underline mt-6 inline-block text-lg"
            >
              {content[language].viewAll}
            </Link>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <ArrowTrendingUpIcon className="h-7 w-7 mr-3 text-purple-400" />
              {content[language].cultureInsights}
            </h2>
            <div className="space-y-4">
              {dummyCultureInsights[language].map((insight) => (
                <div
                  key={insight.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-4"
                >
                  <span className="text-gray-300 text-lg">
                    {insight.insight}
                  </span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      insight.importance === 'High' ||
                      insight.importance === '높음'
                        ? 'bg-red-500 bg-opacity-20 text-red-400'
                        : insight.importance === 'Medium' ||
                          insight.importance === '중간'
                        ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                        : 'bg-green-500 bg-opacity-20 text-green-400'
                    }`}
                  >
                    {insight.importance}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/insights"
              className="text-purple-400 hover:underline mt-6 inline-block text-lg"
            >
              {content[language].viewAll}
            </Link>
          </div>
        </div>

        {/* Upcoming Surveys and Team Feedback sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <CalendarIcon className="h-7 w-7 mr-3 text-green-400" />
              {content[language].upcomingSurveys}
            </h2>
            <div className="space-y-4">
              {dummyUpcomingSurveys[language].map((survey) => (
                <div
                  key={survey.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-4"
                >
                  <div>
                    <span className="text-gray-300 text-lg">{survey.name}</span>
                    <p className="text-gray-400 text-sm">{survey.date}</p>
                  </div>
                  <Link
                    href={`/surveys/${survey.id}`}
                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                  >
                    {content[language].viewSurvey}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <ChatBubbleLeftRightIcon className="h-7 w-7 mr-3 text-yellow-400" />
              {content[language].teamFeedback}
            </h2>
            <div className="space-y-4">
              {dummyTeamFeedback[language].map((feedback) => (
                <div
                  key={feedback.id}
                  className="border-b border-gray-700 pb-4"
                >
                  <p className="text-gray-300 text-lg mb-2">
                    "{feedback.message}"
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      - {feedback.from}
                    </span>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300">
                      {content[language].respondToFeedback}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-6">
          <Link
            href="/survey/create"
            className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 flex items-center text-lg font-semibold"
          >
            <ClipboardDocumentListIcon className="h-6 w-6 mr-3" />
            {content[language].createSurvey}
          </Link>
          <Link
            href="/reports"
            className="px-8 py-4 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 flex items-center text-lg font-semibold"
          >
            <ChartBarIcon className="h-6 w-6 mr-3" />
            {content[language].viewReports}
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
