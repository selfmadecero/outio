'use client';

import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import LanguageSelector from '../../components/LanguageSelector';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// content 객체의 타입 정의
type ContentType = {
  en: {
    title: string;
    subtitle: string;
    description: string[];
    features: string[];
    demoInfo: string;
    googleSignIn: string;
    errorAuth: string;
    backToHome: string;
  };
  ko: {
    title: string;
    subtitle: string;
    description: string[];
    features: string[];
    demoInfo: string;
    googleSignIn: string;
    errorAuth: string;
    backToHome: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Welcome to Outio',
    subtitle: 'AI-Powered Culture-Fit Hiring Solution',
    description: [
      'Understand your organizational culture through pulse surveys,',
      'Create a dynamic culture profile with AI analysis,',
      'Receive tailored interview questions for culture-fit hiring.',
    ],
    features: [
      'Conduct continuous culture diagnosis',
      'Generate dynamic culture profiles',
      'Get AI-powered interview questions',
    ],
    demoInfo: 'Experience how Outio can transform your hiring process:',
    googleSignIn: 'Sign in with Google to Start Demo',
    errorAuth: 'Authentication error:',
    backToHome: 'Back to Home',
  },
  ko: {
    title: 'Outio에 오신 것을 환영합니다',
    subtitle: 'AI 기반 문화 적합성 채용 솔루션',
    description: [
      '펄스 설문으로 조직 문화를 이해하고,',
      'AI 분석으로 동적 문화 프로필을 생성하며,',
      '문화 적합성 채용을 위한 맞춤형 면접 질문을 받아보세요.',
    ],
    features: [
      '지속적인 문화 진단 실시',
      '동적 문화 프로필 생성',
      'AI 기반 면접 질문 제공',
    ],
    demoInfo: 'Outio가 어떻게 채용 프로세스를 혁신하는지 경험해보세요:',
    googleSignIn: 'Google로 로그인하여 데모 시작하기',
    errorAuth: '인증 오류:',
    backToHome: '홈으로 돌아가기',
  },
};

export default function Auth() {
  const router = useRouter();
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error(content[language].errorAuth, error);
      alert(content[language].errorAuth + ' ' + (error as Error).message);
    }
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ko') => {
    // Implement language change logic here
    console.log(`Language changed to ${newLanguage}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row"
      >
        <div className="lg:w-1/2 lg:pr-8 lg:border-r border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/"
              className="flex items-center text-blue-500 hover:underline"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              <span>{content[language].backToHome}</span>
            </Link>
            <LanguageSelector onChange={() => {}} />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            {content[language].title}
          </h1>
          <p className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            {content[language].subtitle}
          </p>
          <div className="mb-6">
            {content[language].description.map((line, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-400 mb-2">
                {line}
              </p>
            ))}
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              {content[language].demoInfo}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {content[language].features.map((feature, index) => (
                <li key={index} className="mb-1">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-8 flex flex-col justify-center mt-8 lg:mt-0">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300 ease-in-out flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
          >
            <FcGoogle className="w-6 h-6" />
            <span>{content[language].googleSignIn}</span>
          </button>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
