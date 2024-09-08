import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const HiringInsights: React.FC = () => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title: 'Hiring Insights',
      openPositions: 'Open Positions',
      applicants: 'Total Applicants',
      interviewsScheduled: 'Interviews Scheduled',
      averageHiringTime: 'Average Hiring Time',
    },
    ko: {
      title: '채용 인사이트',
      openPositions: '공개 채용 포지션',
      applicants: '총 지원자 수',
      interviewsScheduled: '예정된 면접',
      averageHiringTime: '평균 채용 소요 시간',
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {content[language].title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard title={content[language].openPositions} value="5" />
        <InsightCard title={content[language].applicants} value="127" />
        <InsightCard title={content[language].interviewsScheduled} value="18" />
        <InsightCard
          title={content[language].averageHiringTime}
          value="21 days"
        />
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="bg-gray-50 rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold mb-2 text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

export default HiringInsights;
