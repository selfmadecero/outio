'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';

interface Question {
  id: number;
  text: {
    ko: string;
    en: string;
  };
  type: 'multiple_choice' | 'text' | 'rating';
  options?: {
    ko: string;
    en: string;
  }[];
}

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
  questions: Question[];
}

const dummySurvey: Survey = {
  id: 1,
  title: {
    ko: '분기별 직원 만족도 조사',
    en: 'Quarterly Employee Satisfaction Survey',
  },
  description: {
    ko: '우리 회사의 전반적인 근무 환경과 문화에 대한 직원들의 의견을 수집합니다.',
    en: 'Collecting employee feedback on our overall work environment and culture.',
  },
  questions: [
    {
      id: 1,
      text: {
        ko: '전반적으로 현재 직장에 얼마나 만족하십니까?',
        en: 'Overall, how satisfied are you with your current workplace?',
      },
      type: 'rating',
    },
    {
      id: 2,
      text: {
        ko: '우리 회사의 문화 중 가장 좋아하는 점은 무엇입니까?',
        en: 'What do you like most about our company culture?',
      },
      type: 'text',
    },
    {
      id: 3,
      text: {
        ko: '다음 중 개선이 필요하다고 생각하는 영역을 선택해주세요.',
        en: 'Which of the following areas do you think need improvement?',
      },
      type: 'multiple_choice',
      options: [
        { ko: '의사소통', en: 'Communication' },
        { ko: '업무 프로세스', en: 'Work processes' },
        { ko: '팀워크', en: 'Teamwork' },
        { ko: '리더십', en: 'Leadership' },
      ],
    },
  ],
};

export default function ParticipateSurvey() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>(
    {}
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSurvey(dummySurvey);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAnswer = (questionId: number, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (survey && currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('제출된 답변:', answers);
    // 여기에 답변 제출 로직 추가
    setIsSubmitted(true);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'rating':
        return (
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleAnswer(question.id, rating.toString())}
                className={`w-12 h-12 rounded-full ${
                  answers[question.id] === rating.toString()
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                } font-bold text-lg`}
              >
                {rating}
              </button>
            ))}
          </div>
        );
      case 'text':
        return (
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            value={(answers[question.id] as string) || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        );
      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {question.options!.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={((answers[question.id] as string[]) || []).includes(
                    option[language as keyof typeof option]
                  )}
                  onChange={(e) => {
                    const currentAnswers =
                      (answers[question.id] as string[]) || [];
                    const newAnswers = e.target.checked
                      ? [
                          ...currentAnswers,
                          option[language as keyof typeof option],
                        ]
                      : currentAnswers.filter(
                          (a) => a !== option[language as keyof typeof option]
                        );
                    handleAnswer(question.id, newAnswers);
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{option[language as keyof typeof option]}</span>
              </label>
            ))}
          </div>
        );
    }
  };

  const renderProgressBar = () => {
    if (!survey) return null;
    const progress = ((currentQuestion + 1) / survey.questions.length) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <motion.div
          className="bg-indigo-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  };

  const renderContent = () => {
    if (!survey) return null;

    const questionText =
      survey.questions[currentQuestion].text[language as 'ko' | 'en'];
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8 w-full max-w-2xl"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-indigo-600">
                {language === 'ko'
                  ? '설문조사가 제출되었습니다'
                  : 'Survey Submitted'}
              </h2>
              <p className="text-gray-600 mb-8">
                {language === 'ko'
                  ? '귀하의 소중한 의견에 감사드립니다'
                  : 'Thank you for your valuable feedback'}
              </p>
              <Link
                href="/surveys"
                className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition duration-300 shadow-md inline-block"
              >
                {language === 'ko'
                  ? '설문조사 홈으로 돌아가기'
                  : 'Return to Surveys'}
              </Link>
            </motion.div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                {survey.title[language as keyof typeof survey.title]}
              </h1>
              <p className="text-gray-600 mb-6">
                {
                  survey.description[
                    language as keyof typeof survey.description
                  ]
                }
              </p>
              {renderProgressBar()}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-indigo-600">
                  {questionText}
                </h2>
                {renderQuestion(survey.questions[currentQuestion])}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'ko' ? '이전' : 'Previous'}
                </button>
                <div className="text-sm font-medium text-indigo-600">
                  {currentQuestion + 1} / {survey.questions.length}
                </div>
                {currentQuestion === survey.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition duration-300 shadow-md"
                  >
                    {language === 'ko' ? '제출' : 'Submit'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition duration-300 shadow-md"
                  >
                    {language === 'ko' ? '다음' : 'Next'}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <AnimatePresence>
        {isLoading ? <LoadingSpinner /> : renderContent()}
      </AnimatePresence>
    </DashboardLayout>
  );
}
