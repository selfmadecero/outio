'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { motion } from 'framer-motion';
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  ChartBarIcon,
  ChartPieIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';

type ContentType = {
  [key in 'en' | 'ko']: {
    title: string;
    description: string;
    totalResponses: string;
    averageSatisfaction: string;
    participationRate: string;
    questionBreakdown: string;
    trend: string;
    insight: string;
    satisfactionDistribution: string;
    keyMetrics: string;
    responseOverTime: string;
    categoryComparison: string;
    openEndedResponses: string;
    exportData: string;
    insightText1: string;
    insightText2: string;
    questionResponses: string;
    viewDetails: string;
    hideDetails: string;
    question: string;
    responseDistribution: string;
    stronglyDisagree: string;
    stronglyAgree: string;
    veryDissatisfied: string;
    dissatisfied: string;
    neutral: string;
    satisfied: string;
    verySatisfied: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Survey Results',
    description: 'Comprehensive analysis of your latest survey',
    totalResponses: 'Total Responses',
    averageSatisfaction: 'Average Satisfaction',
    participationRate: 'Participation Rate',
    questionBreakdown: 'Question Breakdown',
    trend: 'Satisfaction Trend',
    insight: 'Key Insights',
    satisfactionDistribution: 'Satisfaction Distribution',
    keyMetrics: 'Key Metrics',
    responseOverTime: 'Response Over Time',
    categoryComparison: 'Category Comparison',
    openEndedResponses: 'Open-ended Responses',
    exportData: 'Export Data',
    insightText1:
      'According to the survey results, overall satisfaction is on an upward trend. In particular, the "Teamwork" category shows high scores, indicating that a collaborative culture is well established within the organization.',
    insightText2:
      'However, the "Compensation" category scores are relatively low, so it is necessary to consider improvement measures. Also, as the score for Q2 is lower than other questions, additional analysis and measures are needed for this area.',
    questionResponses: 'Question Responses',
    viewDetails: 'View Details',
    hideDetails: 'Hide Details',
    question: 'Question',
    responseDistribution: 'Response Distribution',
    stronglyDisagree: 'Strongly Disagree',
    stronglyAgree: 'Strongly Agree',
    veryDissatisfied: 'Very Dissatisfied',
    dissatisfied: 'Dissatisfied',
    neutral: 'Neutral',
    satisfied: 'Satisfied',
    verySatisfied: 'Very Satisfied',
  },
  ko: {
    title: '설문조사 결과',
    description: '최근 설문조사에 대한 종합 분석',
    totalResponses: '총 응답 수',
    averageSatisfaction: '평균 만족도',
    participationRate: '참여율',
    questionBreakdown: '질문별 분석',
    trend: '만족도 추이',
    insight: '주요 인사이트',
    satisfactionDistribution: '만족도 분포',
    keyMetrics: '주요 지표',
    responseOverTime: '시간별 응답 추이',
    categoryComparison: '카테고리별 비교',
    openEndedResponses: '주관식 응답',
    exportData: '데이터 내보내기',
    insightText1:
      '설문 결과에 따르면 전반적인 만족도가 상승 추세에 있습니다. 특히 "팀워크" 카테고리에서 높은 점수를 보이고 있어, 조직 내 협업 문화가 잘 정착되어 있음을 알 수 있습니다.',
    insightText2:
      '다만, "보상" 카테고리의 점수가 상대적으로 낮은 편이므로, 이에 대한 개선 방안을 모색해볼 필요가 있습니다. 또한, Q2 문항의 점수가 다른 문항에 비해 낮으므로 해당 영역에 대한 추가적인 분석과 대책 마련이 필요해 보입니다.',
    questionResponses: '문항별 응답 결과',
    viewDetails: '상세 보기',
    hideDetails: '접기',
    question: '문',
    responseDistribution: '응답 분포',
    stronglyDisagree: '매우 그렇지 않다',
    stronglyAgree: '매우 그렇다',
    veryDissatisfied: '매우 불만족',
    dissatisfied: '불만족',
    neutral: '보통',
    satisfied: '만족',
    verySatisfied: '매우 만족',
  },
};

const dummyData = {
  totalResponses: 500,
  averageSatisfaction: 4.2,
  participationRate: 85,
  satisfactionDistribution: [
    { name: 'veryDissatisfied', value: 20 },
    { name: 'dissatisfied', value: 50 },
    { name: 'neutral', value: 100 },
    { name: 'satisfied', value: 200 },
    { name: 'verySatisfied', value: 130 },
  ],
  questionBreakdown: [
    { question: 'Q1', score: 4.5 },
    { question: 'Q2', score: 3.8 },
    { question: 'Q3', score: 4.2 },
    { question: 'Q4', score: 4.0 },
    { question: 'Q5', score: 4.7 },
  ],
  trend: [
    { month: 'Jan', satisfaction: 4.0 },
    { month: 'Feb', satisfaction: 4.1 },
    { month: 'Mar', satisfaction: 4.3 },
    { month: 'Apr', satisfaction: 4.2 },
    { month: 'May', satisfaction: 4.4 },
  ],
  categoryComparison: [
    { category: '업무 환경', score: 80 },
    { category: '팀워크', score: 90 },
    { category: '리더십', score: 75 },
    { category: '개인 성장', score: 85 },
    { category: '보상', score: 70 },
  ],
  responseOverTime: [
    { date: '2023-05-01', responses: 20 },
    { date: '2023-05-02', responses: 35 },
    { date: '2023-05-03', responses: 45 },
    { date: '2023-05-04', responses: 30 },
    { date: '2023-05-05', responses: 50 },
  ],
  openEndedResponses: [
    {
      question: 'How can we improve our work environment?',
      responses: [
        'More flexible work hours would be great.',
        'We need better communication tools.',
        "I'd like to see more team-building activities.",
      ],
    },
    {
      question: 'What do you like most about our company culture?',
      responses: [
        'The collaborative atmosphere is fantastic.',
        'I appreciate the focus on work-life balance.',
        'The learning opportunities are excellent.',
      ],
    },
  ],
  questionResponses: [
    {
      question: {
        en: 'Are you satisfied with your work environment?',
        ko: '업무 환경에 만족하십니까?',
      },
      responses: [
        { answer: 'stronglyAgree', count: 20 },
        { answer: 'agree', count: 50 },
        { answer: 'neutral', count: 15 },
        { answer: 'disagree', count: 10 },
        { answer: 'stronglyDisagree', count: 5 },
      ],
    },
    {
      question: {
        en: 'Do you think communication within the team is smooth?',
        ko: '팀 내 의사소통이 원활하다고 생각하십니까?',
      },
      responses: [
        { answer: 'stronglyAgree', count: 30 },
        { answer: 'agree', count: 45 },
        { answer: 'neutral', count: 15 },
        { answer: 'disagree', count: 8 },
        { answer: 'stronglyDisagree', count: 2 },
      ],
    },
    {
      question: {
        en: 'Do you feel your work is valued?',
        ko: '귀하의 업무가 가치 있게 여겨진다고 느끼십니까?',
      },
      responses: [
        { answer: 'stronglyAgree', count: 30 },
        { answer: 'agree', count: 40 },
        { answer: 'neutral', count: 20 },
        { answer: 'disagree', count: 7 },
        { answer: 'stronglyDisagree', count: 3 },
      ],
    },
    {
      question: {
        en: 'Are you satisfied with the opportunities for professional growth?',
        ko: '전문성 성장을 위한 기회에 만족하십니까?',
      },
      responses: [
        { answer: 'stronglyAgree', count: 20 },
        { answer: 'agree', count: 35 },
        { answer: 'neutral', count: 25 },
        { answer: 'disagree', count: 15 },
        { answer: 'stronglyDisagree', count: 5 },
      ],
    },
    {
      question: {
        en: 'Do you feel the company culture aligns with your values?',
        ko: '회사 문화가 귀하의 가치관과 일치한다고 느끼십니까?',
      },
      responses: [
        { answer: 'stronglyAgree', count: 20 },
        { answer: 'agree', count: 40 },
        { answer: 'neutral', count: 30 },
        { answer: 'disagree', count: 8 },
        { answer: 'stronglyDisagree', count: 2 },
      ],
    },
  ],
};

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884D8'];

export default function SurveyResults() {
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const getAnswerLabel = (answer: string) => {
    switch (answer) {
      case 'stronglyAgree':
        return content[language].stronglyAgree;
      case 'agree':
        return language === 'en' ? 'Agree' : '그렇다';
      case 'neutral':
        return language === 'en' ? 'Neutral' : '보통이다';
      case 'disagree':
        return language === 'en' ? 'Disagree' : '그렇지 않다';
      case 'stronglyDisagree':
        return content[language].stronglyDisagree;
      default:
        return answer;
    }
  };

  const getSatisfactionLabel = (name: string) => {
    return content[language][name as keyof (typeof content)[typeof language]];
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {content[language].title}
            </h1>
            <button
              onClick={handleExportData}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              <DocumentIcon className="h-5 w-5 mr-2" />
              {content[language].exportData}
            </button>
          </div>
          <p className="text-gray-600 mb-8">{content[language].description}</p>

          {/* 주요 인사이트 섹션을 여기로 이동 */}
          <div className="bg-indigo-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
              {content[language].insight}
            </h2>
            <div className="flex items-start space-x-4">
              <LightBulbIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 mb-2">
                  {content[language].insightText1}
                </p>
                <p className="text-gray-700">
                  {content[language].insightText2}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KeyMetricCard
              title={content[language].totalResponses}
              value={dummyData.totalResponses}
              icon={<ChartBarIcon className="h-8 w-8 text-blue-500" />}
            />
            <KeyMetricCard
              title={content[language].averageSatisfaction}
              value={dummyData.averageSatisfaction}
              icon={<ChartPieIcon className="h-8 w-8 text-green-500" />}
            />
            <KeyMetricCard
              title={content[language].participationRate}
              value={`${dummyData.participationRate}%`}
              icon={<ArrowTrendingUpIcon className="h-8 w-8 text-purple-500" />}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {content[language].questionResponses}
          </h2>
          {dummyData.questionResponses.map((item, index) => (
            <div key={index} className="mb-10 bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                {item.question[language]}
              </h3>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={item.responses} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="answer"
                      type="category"
                      width={150}
                      tickFormatter={getAnswerLabel}
                    />
                    <Tooltip
                      formatter={(value, name, props) => [
                        value,
                        getAnswerLabel(props.payload.answer),
                      ]}
                    />
                    <Bar dataKey="count" fill="#8884d8">
                      {item.responses.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title={content[language].satisfactionDistribution}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dummyData.satisfactionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${getSatisfactionLabel(name)} ${(percent * 100).toFixed(
                      0
                    )}%`
                  }
                >
                  {dummyData.satisfactionDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    value,
                    getSatisfactionLabel(props.name as string),
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title={content[language].trend}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyData.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="satisfaction" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}

const KeyMetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center transition-all duration-300 hover:shadow-lg">
    <div className="mr-4 bg-indigo-100 rounded-full p-3">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
    </div>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </motion.div>
);
