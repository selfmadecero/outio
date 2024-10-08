'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardDocumentListIcon,
  PlusIcon,
  ChartBarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/LoadingSpinner';
import Link from 'next/link';

interface Survey {
  id: number;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  status: 'active' | 'completed' | 'draft';
  responseRate: number;
  createdAt: string;
}

const dummySurveys: Survey[] = [
  {
    id: 1,
    title: {
      ko: '분기별 직원 만족도 조사',
      en: 'Quarterly Employee Satisfaction Survey',
    },
    description: {
      ko: '우리 회사의 전반적인 근무 환경과 문화에 대한 직원들의 의견을 수집합니다.',
      en: 'Collecting employee feedback on our overall work environment and culture.',
    },
    status: 'active',
    responseRate: 75,
    createdAt: '2023-06-01',
  },
  {
    id: 2,
    title: {
      ko: '원격 근무 정책 평가',
      en: 'Remote Work Policy Evaluation',
    },
    description: {
      ko: '현재 시행 중인 원격 근무 정책의 효과성과 개선점을 파악합니다.',
      en: 'Assessing the effectiveness and areas for improvement in our current remote work policy.',
    },
    status: 'completed',
    responseRate: 92,
    createdAt: '2023-05-15',
  },
  {
    id: 3,
    title: {
      ko: '신입 사원 온보딩 프로세스 피드백',
      en: 'New Employee Onboarding Process Feedback',
    },
    description: {
      ko: '최근 입사한 직원들을 대상으로 온보딩 프로세스의 효과성을 평가합니다.',
      en: 'Evaluating the effectiveness of our onboarding process for recently joined employees.',
    },
    status: 'active',
    responseRate: 40,
    createdAt: '2023-06-10',
  },
  {
    id: 4,
    title: {
      ko: '팀 간 협업 문화 진단',
      en: 'Inter-team Collaboration Culture Assessment',
    },
    description: {
      ko: '부서 간 협업 현황과 개선점을 파악하여 더 나은 협업 문화를 만들어갑니다.',
      en: 'Identifying the current state and areas for improvement in inter-departmental collaboration.',
    },
    status: 'draft',
    responseRate: 0,
    createdAt: '2023-06-18',
  },
  {
    id: 5,
    title: {
      ko: '직원 복지 프로그램 평가',
      en: 'Employee Benefits Program Evaluation',
    },
    description: {
      ko: '현재 제공 중인 원 복지 프로그램의 만족도와 개선 요구사항을 조사합니다.',
      en: 'Surveying satisfaction levels and improvement needs for our current employee benefits program.',
    },
    status: 'active',
    responseRate: 60,
    createdAt: '2023-06-05',
  },
];

// ResponseBar 컴포넌트 추가
const ResponseBar: React.FC<{ rate: number }> = ({ rate }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
    <div
      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${rate}%` }}
    ></div>
  </div>
);

export default function SurveyList() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(
    null
  );

  const content: {
    [key in 'en' | 'ko']: {
      title: string;
      description: string;
      createSurvey: string;
      active: string;
      completed: string;
      draft: string;
      responseRate: string;
      viewResults: string;
      deleteSurvey: string;
      deleteConfirmation: string;
      cancel: string;
      confirm: string;
    };
  } = {
    en: {
      title: 'Surveys',
      description:
        'Create and manage surveys to gather insights from your team.',
      createSurvey: 'Create New Survey',
      active: 'Active',
      completed: 'Completed',
      draft: 'Draft',
      responseRate: 'Response Rate',
      viewResults: 'View Results',
      deleteSurvey: 'Delete Survey',
      deleteConfirmation: 'Are you sure you want to delete this survey?',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
    ko: {
      title: '설문조사',
      description:
        '팀의 인사이트를 수집하기 위한 설문조사를 생성하고 관리하세요.',
      createSurvey: '새 설문조사 만들기',
      active: '진행 중',
      completed: '완료됨',
      draft: '임시저장',
      responseRate: '응답률',
      viewResults: '결과 보기',
      deleteSurvey: '설문조사 삭제',
      deleteConfirmation: '이 설문조사를 삭제하시겠습니까?',
      cancel: '취소',
      confirm: '확인',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setSurveys(dummySurveys);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleViewResults = (surveyId: number) => {
    // 데모 버전이므로 모든 설문에 대해 같은 결과 페이지로 이동
    window.location.href = '/surveys/results';
  };

  const handleDeleteSurvey = (surveyId: number) => {
    setDeleteConfirmation(surveyId);
  };

  const confirmDeleteSurvey = (surveyId: number) => {
    setSurveys(surveys.filter((survey) => survey.id !== surveyId));
    setDeleteConfirmation(null);
  };

  const renderContent = () => (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800 flex items-center">
          <ClipboardDocumentListIcon className="h-10 w-10 mr-4 text-indigo-500" />
          {content[language as keyof typeof content].title}
        </h1>
        <p className="text-gray-600 mb-6">
          {content[language as keyof typeof content].description}
        </p>
        <Link
          href="/surveys/create" // 여기를 /survey/create에서 /surveys/create로 변경
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md flex items-center inline-block"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {content[language as keyof typeof content].createSurvey}
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <motion.div
            key={survey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 relative"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {survey.title[language as 'ko' | 'en']}
            </h2>
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">
              {survey.description[language as 'ko' | 'en']}
            </p>
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  survey.status === 'active'
                    ? 'bg-green-100 text-green-600'
                    : survey.status === 'completed'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {content[language as keyof typeof content].active}
              </span>
              <span className="text-gray-500 text-sm">{survey.createdAt}</span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {content[language as keyof typeof content].responseRate}
                </span>
                <span className="text-sm font-medium text-indigo-600">
                  {survey.responseRate}%
                </span>
              </div>
              <ResponseBar rate={survey.responseRate} />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleViewResults(survey.id)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 flex items-center"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                {content[language as keyof typeof content].viewResults}
              </button>
              <button
                onClick={() => handleDeleteSurvey(survey.id)}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>

            {deleteConfirmation === survey.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-xl"
              >
                <div className="text-center">
                  <p className="mb-4">
                    {
                      content[language as keyof typeof content]
                        .deleteConfirmation
                    }
                  </p>
                  <div className="space-x-4">
                    <button
                      onClick={() => setDeleteConfirmation(null)}
                      className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                      {content[language as keyof typeof content].cancel}
                    </button>
                    <button
                      onClick={() => confirmDeleteSurvey(survey.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      {content[language as keyof typeof content].confirm}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <AnimatePresence>
        {isLoading ? <LoadingSpinner /> : renderContent()}
      </AnimatePresence>
    </DashboardLayout>
  );
}
