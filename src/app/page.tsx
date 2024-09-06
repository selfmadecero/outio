'use client';

import { useState, useEffect } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { auth } from '../firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const content = {
    en: {
      title: 'Outio',
      subtitle: 'Innovative Culture-Fit Hiring Solution',
      description:
        'Understand your organizational culture and find the best-fitting talent.',
      feature1: 'Continuous Culture Diagnosis',
      feature1Description:
        'Regular pulse surveys to keep your culture profile up-to-date.',
      feature2: 'Dynamic Culture Profile',
      feature2Description:
        'Real-time analysis to create a dynamic cultural profile of your organization.',
      feature3: 'Tailored Hiring Solution',
      feature3Description:
        'Automatically generated interview questions and evaluation criteria based on your culture.',
      feature4: 'AI-Powered Insights',
      feature4Description:
        'Leverage advanced AI to gain deep insights into your organizational culture.',
      cta: 'Get Started',
      login: 'Log In',
      signup: 'Sign Up',
      howItWorks: 'How It Works',
      step1: 'Conduct Pulse Surveys',
      step2: 'Generate Culture Profile',
      step3: 'Create Tailored Interview Questions',
      step4: 'Optimize Hiring Process',
      step1Description:
        'Regular surveys to understand your organizational culture',
      step2Description:
        'AI-powered analysis creates a dynamic cultural profile',
      step3Description:
        'Generate custom interview questions based on your culture',
      step4Description:
        'Make informed hiring decisions with data-driven insights',
    },
    ko: {
      title: 'Outio',
      subtitle: '혁신적인 문화 적합성 채용 솔루션',
      description: '조직 문화를 이해하고 가장 잘 맞는 인재를 찾으세요.',
      feature1: '지속적인 문화 진단',
      feature1Description:
        '정기적인 펄스 설문조사로 문화 프로필을 최신 상태로 유지합니다.',
      feature2: '동적 문화 프로필',
      feature2Description:
        '실시간 분석을 통해 조직의 동적 문화 프로필을 생성합니다.',
      feature3: '맞춤형 채용 솔루션',
      feature3Description:
        '귀사의 문화를 바탕으로 자동 생성된 면접 질문과 평가 기준을 제공합니다.',
      feature4: 'AI 기반 인사이트',
      feature4Description:
        '고급 AI를 활용하여 조직 문화에 대한 깊이 있는 통찰력을 얻으세요.',
      cta: '시작하기',
      login: '로그인',
      signup: '회원가입',
      howItWorks: '서비스 이용 방법',
      step1: '펄스 설문 실시',
      step2: '문화 프로필 생성',
      step3: '맞춤형 면접 질문 작성',
      step4: '채용 프로세스 최적화',
      step1Description: '정기적인 설문으로 조직 문화 이해',
      step2Description: 'AI 기반 분석으로 동적 문화 프로필 생성',
      step3Description: '귀사의 문화에 기반한 맞춤형 면접 질문 생성',
      step4Description: '데이터 기반 인사이트로 정보에 기반한 채용 결정',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {content[language].title}
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSelector onChange={() => {}} />
            <Link
              href="/auth"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {content[language].signup}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl px-4"
        >
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              {content[language].subtitle}
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {content[language].description}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 md:py-4 md:text-lg md:px-10"
              >
                {content[language].cta}
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            {content[language].howItWorks}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: content[language].step1,
                description: content[language].step1Description,
                icon: ChartBarIcon,
              },
              {
                title: content[language].step2,
                description: content[language].step2Description,
                icon: PuzzlePieceIcon,
              },
              {
                title: content[language].step3,
                description: content[language].step3Description,
                icon: UserGroupIcon,
              },
              {
                title: content[language].step4,
                description: content[language].step4Description,
                icon: LightBulbIcon,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: content[language].feature1,
                description: content[language].feature1Description,
                icon: ChartBarIcon,
              },
              {
                title: content[language].feature2,
                description: content[language].feature2Description,
                icon: UserGroupIcon,
              },
              {
                title: content[language].feature3,
                description: content[language].feature3Description,
                icon: PuzzlePieceIcon,
              },
              {
                title: content[language].feature4,
                description: content[language].feature4Description,
                icon: LightBulbIcon,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Outio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
