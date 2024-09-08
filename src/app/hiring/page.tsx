'use client';

import { useState, useEffect } from 'react'; // useEffect를 추가로 import
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Hiring() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('cultureFit');
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      title: 'Culture-Driven Hiring',
      cultureFit: 'Culture Fit',
      interviewQuestions: 'Interview Questions',
      candidates: 'Candidates',
      insights: 'Insights',
      createJob: 'Create New Job Posting',
    },
    ko: {
      title: '문화 기반 채용',
      cultureFit: '문화 적합성',
      interviewQuestions: '면접 질문',
      candidates: '지원자',
      insights: '인사이트',
      createJob: '새 채용공고 작성',
    },
  };

  const tabContent = {
    en: {
      cultureFit: [
        {
          title: 'Teamwork Score',
          value: '85%',
          description: 'High alignment with collaborative culture',
        },
        {
          title: 'Innovation Score',
          value: '72%',
          description: 'Good fit for creative environments',
        },
        {
          title: 'Leadership Style',
          value: '68%',
          description: 'Tends towards participative leadership',
        },
      ],
      interviewQuestions: [
        {
          question:
            'Describe a situation where you had to adapt to a different work culture.',
          category: 'Adaptability',
        },
        {
          question: 'How do you approach collaboration in a diverse team?',
          category: 'Teamwork',
        },
        {
          question:
            'Share an example of how you contributed to innovation in your previous role.',
          category: 'Innovation',
        },
      ],
      candidates: [
        {
          name: 'John Doe',
          position: 'Software Engineer',
          cultureFitScore: '92%',
        },
        {
          name: 'Jane Smith',
          position: 'Product Manager',
          cultureFitScore: '88%',
        },
        {
          name: 'Mike Johnson',
          position: 'UX Designer',
          cultureFitScore: '85%',
        },
      ],
      insights: [
        {
          title: 'Culture Trend',
          description: 'Increasing emphasis on work-life balance',
        },
        {
          title: 'Hiring Impact',
          description: 'Recent hires show 15% higher retention rate',
        },
        {
          title: 'Area for Improvement',
          description: 'Consider diversity in leadership roles',
        },
      ],
    },
    ko: {
      cultureFit: [
        {
          title: '팀워크 점수',
          value: '85%',
          description: '협업 문화와 높은 일치도',
        },
        { title: '혁신 점수', value: '72%', description: '창의적 환경에 적합' },
        {
          title: '리더십 스타일',
          value: '68%',
          description: '참여적 리더십 경향',
        },
      ],
      interviewQuestions: [
        {
          question: '다른 업무 문화에 적응해야 했던 상황을 설명해주세요.',
          category: '적응력',
        },
        {
          question: '다양한 팀에서 협업하는 방식에 대해 어떻게 접근하시나요?',
          category: '팀워크',
        },
        {
          question: '이전 역할에서 혁신에 기여한 예를 공유해주세요.',
          category: '혁신',
        },
      ],
      candidates: [
        {
          name: '홍길동',
          position: '소���트웨어 엔지니어',
          cultureFitScore: '92%',
        },
        { name: '김철수', position: '제품 관리자', cultureFitScore: '88%' },
        { name: '이영희', position: 'UX 디자이너', cultureFitScore: '85%' },
      ],
      insights: [
        { title: '문화 트렌드', description: '워라밸에 대한 강조 증가' },
        {
          title: '채용 영향',
          description: '최근 채용된 직원들의 유지율 15% 상승',
        },
        { title: '개선 영역', description: '리더십 역할의 다양성 고려' },
      ],
    },
  };

  const renderTabContent = () => {
    const currentContent =
      tabContent[language][activeTab as keyof typeof tabContent.en];
    return currentContent.map((item: any, index: number) => (
      <motion.div
        key={index}
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {'title' in item && (
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        )}
        {'value' in item && (
          <p className="text-3xl font-bold text-blue-600 mb-2">{item.value}</p>
        )}
        {'description' in item && (
          <p className="text-gray-600">{item.description}</p>
        )}
        {'question' in item && (
          <>
            <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
            <p className="text-sm text-gray-600">Category: {item.category}</p>
          </>
        )}
        {'name' in item && (
          <>
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.position}</p>
            <p className="text-lg font-bold text-green-600">
              Culture Fit: {item.cultureFitScore}
            </p>
          </>
        )}
      </motion.div>
    ));
  };

  useEffect(() => {
    // 데이터 로딩 로직
    // ...
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {content[language].title}
        </motion.h1>

        <div className="mb-8 flex justify-center space-x-4">
          {['cultureFit', 'interviewQuestions', 'candidates', 'insights'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {content[language][tab as keyof typeof content.en]}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderTabContent()}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300">
            {content[language].createJob}
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
