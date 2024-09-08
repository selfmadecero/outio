'use client';

import React from 'react';
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
  StarIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

// content 객체의 타입 정의
type ContentType = {
  en: {
    title: string;
    subtitle: string[];
    description: string[];
    feature1: string;
    feature1Description: string;
    feature1Benefit: string;
    feature2: string;
    feature2Description: string;
    feature2Benefit: string;
    feature3: string;
    feature3Description: string;
    feature3Benefit: string;
    feature4: string;
    feature4Description: string;
    feature4Benefit: string;
    feature5: string;
    feature5Description: string;
    feature5Benefit: string;
    feature6: string;
    feature6Description: string;
    feature6Benefit: string;
    cta: string;
    login: string;
    signup: string;
    howItWorks: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step1Description: string;
    step2Description: string;
    step3Description: string;
    step4Description: string;
    testimonials: string;
    testimonial1: {
      text: string;
      author: string;
    };
    testimonial2: {
      text: string;
      author: string;
    };
    featuresTitle: string;
    keyBenefit: string;
    tryDemo: string;
    joinWaitlist: string;
    waitlistBanner: string;
    trustedBy: string;
    trustedCompanies: string[];
    keyBenefits: string;
    benefit1Title: string;
    benefit1Description: string;
    benefit2Title: string;
    benefit2Description: string;
    benefit3Title: string;
    benefit3Description: string;
    caseStudyTitle: string;
    caseStudyCompany: string;
    caseStudyDescription: string;
    caseStudyResults: string[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
  ko: {
    title: string;
    subtitle: string[];
    description: string[];
    feature1: string;
    feature1Description: string;
    feature1Benefit: string;
    feature2: string;
    feature2Description: string;
    feature2Benefit: string;
    feature3: string;
    feature3Description: string;
    feature3Benefit: string;
    feature4: string;
    feature4Description: string;
    feature4Benefit: string;
    feature5: string;
    feature5Description: string;
    feature5Benefit: string;
    feature6: string;
    feature6Description: string;
    feature6Benefit: string;
    cta: string;
    login: string;
    signup: string;
    howItWorks: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step1Description: string;
    step2Description: string;
    step3Description: string;
    step4Description: string;
    testimonials: string;
    testimonial1: {
      text: string;
      author: string;
    };
    testimonial2: {
      text: string;
      author: string;
    };
    featuresTitle: string;
    keyBenefit: string;
    tryDemo: string;
    joinWaitlist: string;
    waitlistBanner: string;
    trustedBy: string;
    trustedCompanies: string[];
    keyBenefits: string;
    benefit1Title: string;
    benefit1Description: string;
    benefit2Title: string;
    benefit2Description: string;
    benefit3Title: string;
    benefit3Description: string;
    caseStudyTitle: string;
    caseStudyCompany: string;
    caseStudyDescription: string;
    caseStudyResults: string[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Outio',
    subtitle: ['AI-Powered Culture-Fit', 'Hiring Solution'],
    description: [
      'Understand your organizational culture,',
      'find the best-fitting talent,',
      'and build high-performing teams.',
    ],
    feature1: 'Continuous Culture Diagnosis',
    feature1Description:
      'Keep your culture profile up-to-date with regular pulse surveys.',
    feature1Benefit:
      'Stay ahead of cultural shifts and address issues proactively.',
    feature2: 'Dynamic Culture Profile',
    feature2Description:
      'Create a real-time cultural profile with AI-driven analysis.',
    feature2Benefit:
      'Make data-driven decisions about your organizational culture.',
    feature3: 'Culture-Fit Interview Guide',
    feature3Description:
      'Get AI-generated interview questions based on your culture profile.',
    feature3Benefit:
      'Improve hiring success rates with culture-aligned candidates.',
    feature4: 'AI-Powered Insights',
    feature4Description:
      'Leverage advanced AI to gain deep insights into your organizational culture.',
    feature4Benefit:
      'Uncover hidden patterns and trends in your organizational culture.',
    feature5: 'Customizable Surveys',
    feature5Description:
      "Tailor surveys to your organization's unique needs and goals.",
    feature5Benefit:
      "Get insights that are truly relevant to your company's specific context and challenges.",
    feature6: 'Data Security & Privacy',
    feature6Description:
      'Enterprise-grade security measures to protect your sensitive cultural data.',
    feature6Benefit:
      'Ensure confidentiality and build trust with your employees.',
    cta: 'Start Your Cultural Journey',
    login: 'Log In',
    signup: 'Sign Up',
    howItWorks: 'How It Works',
    step1: 'Conduct Pulse Surveys',
    step2: 'Generate Culture Profile',
    step3: 'Get Tailored Interview Questions',
    step4: 'Make Informed Hiring Decisions',
    step1Description: 'Understand your evolving organizational culture',
    step2Description: 'Create a dynamic cultural profile with AI analysis',
    step3Description: 'Receive custom interview questions for your culture',
    step4Description:
      'Select the best-fitting candidates with data-driven insights',
    testimonials: 'What Our Clients Say',
    testimonial1: {
      text: "Outio has transformed our hiring process. We've seen a significant improvement in cultural fit and employee retention.",
      author: 'Jane Doe, HR Director at TechCorp',
    },
    testimonial2: {
      text: 'The AI-powered insights have given us a deeper understanding of our organizational culture. Highly recommended!',
      author: 'John Smith, CEO of InnovateCo',
    },
    featuresTitle: 'Powerful Features for Cultural Excellence',
    keyBenefit: 'Key Benefit:',
    tryDemo: 'Try Demo',
    joinWaitlist: 'Join Waitlist',
    waitlistBanner: 'Excited about Outio? Join our waitlist for early access!',
    trustedBy: 'Trusted By',
    trustedCompanies: [
      'TechCorp',
      'InnovateCo',
      'GlobalSoft',
      'FutureTech',
      'DataDynamics',
    ],
    keyBenefits: 'Key Benefits',
    benefit1Title: 'Improve Hiring Success',
    benefit1Description:
      'Identify and attract the right candidates for your culture',
    benefit2Title: 'Enhance Employee Satisfaction',
    benefit2Description:
      'Create a positive work environment that fosters employee well-being',
    benefit3Title: 'Boost Productivity',
    benefit3Description:
      'Leverage data-driven insights to optimize team performance',
    caseStudyTitle: 'Case Study',
    caseStudyCompany: 'TechCorp',
    caseStudyDescription:
      'TechCorp transformed their hiring process with Outio, resulting in a 20% increase in employee retention and a 30% boost in productivity.',
    caseStudyResults: [
      '20% increase in employee retention',
      '30% boost in productivity',
      '95% candidate satisfaction',
    ],
    ctaTitle: 'Join the Cultural Revolution',
    ctaDescription:
      'Start your cultural journey today and unlock the full potential of your team.',
    ctaButton: 'Get Started',
  },
  ko: {
    title: 'Outio',
    subtitle: ['AI 기반 문화 적합성', '채용 솔루션'],
    description: [
      '조직 문화를 이해하고,',
      '가장 잘 맞는 인재를 찾아',
      '고성과 팀을 구축하세요.',
    ],
    feature1: '지속적인 문화 진단',
    feature1Description:
      '정기적인 펄스 설문으로 문화 프로필을 최신 상태로 유지합니다.',
    feature1Benefit: '문화적 변화를 선제적으로 파악하고 대응하세요.',
    feature2: '동적 문화 프로필',
    feature2Description: 'AI 기반 분석으로 실시간 문화 프로필을 생성합니다.',
    feature2Benefit: '조직 문화에 대한 데이터 기반 의사결정을 내리세요.',
    feature3: '문화 적합성 면접 가이드',
    feature3Description: '문화 프로필 기반의 AI 생성 면접 질문을 받아보세요.',
    feature3Benefit: '문화에 적합한 후보자 선별로 채용 성공률을 높이세요.',
    feature4: 'AI 기반 인사이트',
    feature4Description:
      '고급 AI를 활용하여 조직 문화에 대한 깊이 있는 통찰력을 얻으세요.',
    feature4Benefit: '조직 문화의 숨겨진 패턴과 트렌드를 발견하세요.',
    feature5: '맞춤형 설문조사',
    feature5Description:
      '귀사의 고유한 요구사항과 목표에 맞는 설문조사를 설계하세요.',
    feature5Benefit:
      '회사의 특정 상황과 과제에 진정으로 관련된 인사이트를 얻으세요.',
    feature6: '데이터 보안 및 개인정보 보호',
    feature6Description:
      '민감한 문화 데이터를 보호하기 위한 기업 수준의 보안 조치.',
    feature6Benefit: '기밀성을 보장하고 직원들과의 신뢰를 구축하세요.',
    cta: '문화 여정을 시작하세요',
    login: '로그인',
    signup: '회원가입',
    howItWorks: '서비스 이용 방법',
    step1: '펄스 설문 실시',
    step2: '문화 프로필 생성',
    step3: '맞춤형 면접 질문 받기',
    step4: '정보 기반 채용 결정',
    step1Description: '변화하는 조직 문화를 이해합니다',
    step2Description: 'AI 분석으로 동적 문화 프로필을 생성합니다',
    step3Description: '문화에 맞는 맞춤형 면접 질문을 제공받습니다',
    step4Description: '데이터 기반 인사이트로 최적의 후보자를 선별합니다',
    testimonials: '고객 후기',
    testimonial1: {
      text: 'Outio는 우리의 채용 과정을 혁신했습니다. 문화적 적합성과 직원 유지율이 크게 향상되었습니다.',
      author: '제인 도, TechCorp HR 디렉터',
    },
    testimonial2: {
      text: 'AI 기반 인사이트를 통해 우리 조직 문화에 대한 더 깊은 이해를 얻을 수 있었습니다. 강력 추천합니다!',
      author: '존 스미스, InnovateCo CEO',
    },
    featuresTitle: '문화적 우수성을 위한 강력한 기능',
    keyBenefit: '주요 이점:',
    tryDemo: '데모 체험하기',
    joinWaitlist: '웨이트리스트 등록',
    waitlistBanner:
      'Outio에 관심이 있으신가요? 얼리 액세스를 위해 웨이트리스트에 등록하세요!',
    trustedBy: '신뢰하는 기업',
    trustedCompanies: [
      '테크코프',
      '이노베이트코',
      '글로벌소프트',
      '퓨처테크',
      '데이터다이나믹스',
    ],
    keyBenefits: '주요 이점',
    benefit1Title: '채용 성공률 향상',
    benefit1Description: '귀사의 문화에 적합한 인재를 식별하고 유치합니다',
    benefit2Title: '직원 만족도 증진',
    benefit2Description: '직원 웰빙을 촉진하는 긍정적인 업무 환경을 조성합니다',
    benefit3Title: '생산성 향상',
    benefit3Description: '데이터 기반 인사이트로 팀 성과를 최적화합니다',
    caseStudyTitle: '사례 연구',
    caseStudyCompany: '테크코프',
    caseStudyDescription:
      '테크코프는 Outio를 통해 채용 프로세스를 혁신하여 직원 유지율 20% 증가와 생산성 30% 향상을 달성했습니다.',
    caseStudyResults: [
      '직원 유지율 20% 증가',
      '생산성 30% 향상',
      '후보자 만족도 95% 달성',
    ],
    ctaTitle: '문화 혁신에 동참하세요',
    ctaDescription:
      '오늘부터 문화 여정을 시작하고 팀의 잠재력을 최대한 발휘하세요.',
    ctaButton: '시작하기',
  },
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Waitlist Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center">
        <p className="text-sm md:text-base">
          {content[language].waitlistBanner}{' '}
          <Link
            href="/waitlist"
            className="font-bold underline hover:text-blue-200 transition-colors duration-300"
          >
            {content[language].joinWaitlist}
          </Link>
        </p>
      </div>

      <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg fixed w-full z-10">
        <div className="container mx-auto px-6 flex justify-between items-center h-20">
          <Link
            href="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            <span className="w-24 inline-block">Outio</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSelector onChange={() => {}} />
            <Link
              href="/auth"
              className="px-6 py-2 rounded-full text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap"
            >
              <span className="w-24 inline-block text-center">
                {content[language].signup}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {language === 'en' ? (
                <>{content[language].subtitle.join(' ')}</>
              ) : (
                <>{content[language].subtitle.join(' ')}</>
              )}
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto">
            {language === 'en' ? (
              <>
                {content[language].description.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                {content[language].description.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </>
            )}
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <Link
              href="/auth"
              className="inline-block px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              {content[language].tryDemo}
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Trusted By 섹션 수정 */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-300">
            {content[language].trustedBy}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {content[language].trustedCompanies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {content[language].howItWorks}
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
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
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white mb-6">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New "Key Benefits" section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {content[language].keyBenefits}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: ArrowUpIcon,
                title: content[language].benefit1Title,
                description: content[language].benefit1Description,
              },
              {
                icon: UserGroupIcon,
                title: content[language].benefit2Title,
                description: content[language].benefit2Description,
              },
              {
                icon: ChartBarIcon,
                title: content[language].benefit3Title,
                description: content[language].benefit3Description,
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-6 shadow-lg"
              >
                <benefit.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {content[language].featuresTitle}
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: content[language].feature1,
                description: content[language].feature1Description,
                icon: ChartBarIcon,
                benefit: content[language].feature1Benefit,
              },
              {
                title: content[language].feature2,
                description: content[language].feature2Description,
                icon: UserGroupIcon,
                benefit: content[language].feature2Benefit,
              },
              {
                title: content[language].feature3,
                description: content[language].feature3Description,
                icon: PuzzlePieceIcon,
                benefit: content[language].feature3Benefit,
              },
              {
                title: content[language].feature4,
                description: content[language].feature4Description,
                icon: LightBulbIcon,
                benefit: content[language].feature4Benefit,
              },
              {
                title: content[language].feature5,
                description: content[language].feature5Description,
                icon: ChartPieIcon,
                benefit: content[language].feature5Benefit,
              },
              {
                title: content[language].feature6,
                description: content[language].feature6Description,
                icon: ShieldCheckIcon,
                benefit: content[language].feature6Benefit,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-start">
                  <div className="flex-shrink-0 mb-6">
                    <feature.icon className="h-12 w-12 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  <div className="mt-auto">
                    <h4 className="text-lg font-medium text-blue-400 mb-2">
                      {content[language].keyBenefit}
                    </h4>
                    <p className="text-gray-300">{feature.benefit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New "Case Study" section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {content[language].caseStudyTitle}
          </h2>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-blue-400"
                >
                  {content[language].caseStudyCompany}
                </motion.div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-2xl font-semibold mb-4">
                  {content[language].caseStudyCompany}
                </h3>
                <p className="text-gray-300 mb-6">
                  {content[language].caseStudyDescription}
                </p>
                <ul className="space-y-2">
                  {content[language].caseStudyResults.map((result, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowUpIcon className="h-5 w-5 text-green-400 mr-2" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {content[language].testimonials}
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {[
              content[language].testimonial1,
              content[language].testimonial2,
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300"
              >
                <div className="flex flex-col items-center">
                  <StarIcon className="h-10 w-10 text-yellow-400 mb-6" />
                  <p className="text-gray-300 italic mb-6 text-lg">
                    "{testimonial.text}"
                  </p>
                  <p className="font-medium text-white">{testimonial.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New CTA section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-8">
            {content[language].ctaTitle}
          </h2>
          <p className="text-xl mb-12">{content[language].ctaDescription}</p>
          <Link
            href="/auth"
            className="inline-block px-8 py-4 text-lg font-semibold rounded-full text-blue-600 bg-white hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
          >
            {content[language].ctaButton}
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <p className="text-center text-gray-400">
            &copy; 2024 Outio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
