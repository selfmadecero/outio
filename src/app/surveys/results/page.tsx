'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';

interface SurveyResult {
  question: {
    en: string;
    ko: string;
  };
  responses: {
    option: {
      en: string;
      ko: string;
    };
    count: number;
  }[];
  trend: 'up' | 'down' | 'stable';
  insight: {
    en: string;
    ko: string;
  };
  trendData: {
    date: string;
    value: number;
  }[];
}

const dummyResults: SurveyResult[] = [
  {
    question: {
      en: 'How satisfied are you with your overall work?',
      ko: '전반적인 업무 만족도는 어떠신가요?',
    },
    responses: [
      { option: { en: 'Very Dissatisfied', ko: '매우 불만족' }, count: 2 },
      { option: { en: 'Dissatisfied', ko: '불만족' }, count: 8 },
      { option: { en: 'Neutral', ko: '보통' }, count: 15 },
      { option: { en: 'Satisfied', ko: '만족' }, count: 45 },
      { option: { en: 'Very Satisfied', ko: '매우 만족' }, count: 30 },
    ],
    trend: 'up',
    insight: {
      en: 'Overall satisfaction has increased by 10% compared to the last quarter. Notably, the proportion of "Very Satisfied" responses has increased.',
      ko: '전반적인 만족도가 지난 분기 대비 10% 상승했습니다. 특히 "매우 만족"의 비율이 증가했습니다.',
    },
    trendData: [
      { date: '2023-01', value: 3.8 },
      { date: '2023-02', value: 3.9 },
      { date: '2023-03', value: 4.0 },
      { date: '2023-04', value: 4.1 },
      { date: '2023-05', value: 4.2 },
      { date: '2023-06', value: 4.3 },
      { date: '2023-07', value: 4.4 },
      { date: '2023-08', value: 4.5 },
    ],
  },
  {
    question: {
      en: 'Do you think the current work environment helps improve productivity?',
      ko: '현재 업무 환경이 생산성 향상에 도움이 된다고 생각하시나요?',
    },
    responses: [
      { option: { en: 'Strongly Disagree', ko: '전혀 그렇지 않다' }, count: 5 },
      { option: { en: 'Disagree', ko: '그렇지 않다' }, count: 10 },
      { option: { en: 'Neutral', ko: '보통이다' }, count: 20 },
      { option: { en: 'Agree', ko: '그렇다' }, count: 40 },
      { option: { en: 'Strongly Agree', ko: '매우 그렇다' }, count: 25 },
    ],
    trend: 'stable',
    insight: {
      en: 'Satisfaction with the work environment remains stable. However, attention should be paid to the "Disagree" and "Strongly Disagree" responses.',
      ko: '업무 환경에 대한 만족도는 안정적입니다. 하지만 "그렇지 않다"와 "전혀 그렇지 않다"의 응답에 주목할 필요가 있습니다.',
    },
    trendData: [
      { date: '2023-01', value: 3.7 },
      { date: '2023-02', value: 3.7 },
      { date: '2023-03', value: 3.8 },
      { date: '2023-04', value: 3.7 },
      { date: '2023-05', value: 3.7 },
      { date: '2023-06', value: 3.8 },
      { date: '2023-07', value: 3.8 },
      { date: '2023-08', value: 3.7 },
    ],
  },
  // 8개의 추가 더미 데이터를 여기에 추가합니다.
  {
    question: {
      en: "How well do you understand the company's goals and vision?",
      ko: '회사의 목표와 비전을 얼마나 잘 이해하고 계신가요?',
    },
    responses: [
      { option: { en: 'Not at all', ko: '전혀 이해하지 못함' }, count: 3 },
      { option: { en: 'Slightly', ko: '약간 이해함' }, count: 12 },
      { option: { en: 'Moderately', ko: '어느 정도 이해함' }, count: 25 },
      { option: { en: 'Very well', ko: '잘 이해함' }, count: 40 },
      { option: { en: 'Completely', ko: '완벽히 이해함' }, count: 20 },
    ],
    trend: 'up',
    insight: {
      en: 'Understanding of company goals has improved. More communication efforts seem to be paying off.',
      ko: '회사 목표에 대한 이해도가 향상되었습니다. 더 많은 소통 노력이 효과를 보고 있는 것 같습니다.',
    },
    trendData: [
      { date: '2023-01', value: 3.5 },
      { date: '2023-02', value: 3.6 },
      { date: '2023-03', value: 3.7 },
      { date: '2023-04', value: 3.8 },
      { date: '2023-05', value: 3.9 },
      { date: '2023-06', value: 4.0 },
      { date: '2023-07', value: 4.1 },
      { date: '2023-08', value: 4.2 },
    ],
  },
  // ... 6개의 추가 더미 데이터를 더 추가합니다 ...
];

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1'];

export default function SurveyResults() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<SurveyResult[]>([]);

  const content = {
    en: {
      title: 'Quarterly Employee Satisfaction Survey', // 변경된 제목
      description: 'Dive deep into your most recent survey insights.',
      totalResponses: 'Total Responses',
      averageSatisfaction: 'Average Satisfaction',
      participationRate: 'Participation Rate',
      questionBreakdown: 'Question Breakdown',
      trend: 'Trend',
      insight: 'Insight',
    },
    ko: {
      title: '분기별 직원 만족도 조사', // 변경된 제목
      description: '가장 최근 설문조사의 인사이트를 자세히 살펴보세요.',
      totalResponses: '총 응답 수',
      averageSatisfaction: '평균 만족도',
      participationRate: '참여율',
      questionBreakdown: '질문별 분석',
      trend: '추세',
      insight: '인사이트',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setResults(dummyResults);
      setIsLoading(false);
    }, 1000);
  }, []);

  const renderMetricCard = (
    icon: React.ReactNode,
    title: string,
    value: string
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800 ml-2">{title}</h3>
      </div>
      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        {value}
      </p>
    </motion.div>
  );

  const renderBarChart = (data: SurveyResult) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.responses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={`option.${language}`} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count">
          {data.responses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderTrendChart = (data: SurveyResult) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data.trendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#3B82F6" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />;
      case 'down':
        return <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />;
      default:
        return <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-500" />;
    }
  };

  const renderContent = () => (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        {content[language].title}
      </motion.h1>
      <p className="text-gray-600 mb-8">{content[language].description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {renderMetricCard(
          <ClipboardDocumentListIcon className="h-6 w-6 text-blue-500" />,
          content[language].totalResponses,
          '150'
        )}
        {renderMetricCard(
          <ChartBarIcon className="h-6 w-6 text-green-500" />,
          content[language].averageSatisfaction,
          '4.2/5'
        )}
        {renderMetricCard(
          <UserGroupIcon className="h-6 w-6 text-purple-500" />,
          content[language].participationRate,
          '85%'
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {content[language].questionBreakdown}
      </h2>
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {result.question[language]}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {renderBarChart(result)}
            {renderTrendChart(result)}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h4 className="text-lg font-semibold text-gray-700">
                {content[language].insight}
              </h4>
            </div>
            <div className="flex items-center">
              {renderTrendIcon(result.trend)}
              <span className="ml-2 text-gray-700 font-medium">
                {content[language].trend}
              </span>
            </div>
          </div>
          <p className="text-gray-600">{result.insight[language]}</p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      {isLoading ? <LoadingSpinner /> : renderContent()}
    </DashboardLayout>
  );
}
