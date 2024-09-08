import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import WaitlistPopup from './WaitlistPopup';

interface OnboardingPopupProps {
  onClose: () => void;
  language: 'en' | 'ko';
}

const content = {
  en: {
    title: 'Welcome to Outio!',
    steps: [
      {
        title: 'Understand Your Culture',
        description:
          "Discover the unique aspects of your organization's culture through our advanced AI-powered surveys. Gain deep insights into what makes your company tick.",
      },
      {
        title: 'Tailor Your Hiring Process',
        description:
          'Use your cultural insights to create personalized interview questions. Find candidates that truly fit your organization and contribute to your culture.',
      },
      {
        title: 'Track Cultural Goals',
        description:
          'Set and monitor progress towards your cultural objectives with our intuitive dashboard. Use real-time analytics to make data-driven decisions about your organizational culture.',
      },
      {
        title: 'Continuous Improvement',
        description:
          'Receive AI-powered recommendations to enhance your organizational culture. Boost employee engagement and productivity through targeted cultural initiatives.',
      },
      {
        title: 'Join the Waitlist',
        description:
          'Be among the first to experience Outio and transform your organizational culture. Join our exclusive waitlist now and get early access to our revolutionary platform!',
      },
    ],
    nextButton: 'Next',
    prevButton: 'Previous',
    closeButton: 'Got it!',
    joinWaitlist: 'Join Waitlist',
  },
  ko: {
    title: 'Outio에 오신 것을 환영합니다!',
    steps: [
      {
        title: '조직 문화 이해하기',
        description:
          'AI 기반 고급 설문조사를 통해 귀사 조직 문화의 고유한 특성을 발견하세요. 회사의 핵심 가치와 동인을 깊이 있게 이해할 수 있습니다.',
      },
      {
        title: '채용 프로세스 최적화',
        description:
          '문화적 인사이트를 활용하여 맞춤형 면접 질문을 만드세요. 조직에 정말 잘 맞고 문화에 기여할 수 있는 후보자를 찾을 수 있습니다.',
      },
      {
        title: '문화적 목표 추적',
        description:
          '직관적인 대시보드로 문화적 목표를 설정하고 진행 상황을 모니터링하세요. 실시간 분석을 통해 조직 문화에 대한 데이터 기반 의사결정을 할 수 있습니다.',
      },
      {
        title: '지속적인 개선',
        description:
          'AI 기반 추천을 통해 조직 문화를 향상시키세요. 목표 지향적인 문화 이니셔티브를 통해 직원 참여도와 생산성을 높일 수 있습니다.',
      },
      {
        title: '웨이팅 리스트 참여',
        description:
          'Outio를 가장 먼저 경험하고 조직 문화를 혁신하세요. 지금 바로 독점 웨이팅 리스트에 참여하여 혁신적인 플랫폼에 조기 접근하세요!',
      },
    ],
    nextButton: '다음',
    prevButton: '이전',
    closeButton: '알겠습니다!',
    joinWaitlist: '웨이팅 리스트 참여',
  },
};

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({
  onClose,
  language,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const { title, steps, nextButton, prevButton, closeButton, joinWaitlist } =
    content[language];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJoinWaitlist = () => {
    setShowWaitlist(true);
  };

  if (showWaitlist) {
    return (
      <WaitlistPopup
        isOpen={showWaitlist}
        onClose={onClose}
        language={language}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 text-lg">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-full transition duration-300 ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
            }`}
          >
            {prevButton}
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              {nextButton}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleJoinWaitlist}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
            >
              {joinWaitlist}
            </button>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentStep ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingPopup;
