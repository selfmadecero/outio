'use client';

import { useState, useEffect } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import AuthButton from '../components/AuthButton';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { auth } from '../firebase';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState<User | null>(null);

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
      feature2: 'Dynamic Culture Profile',
      feature3: 'Tailored Hiring Solution',
      cta: 'Get Started',
    },
    ko: {
      title: 'Outio',
      subtitle: '혁신적인 문화 적합성 채용 솔루션',
      description: '조직 문화를 이해하고 가장 잘 맞는 인재를 찾으세요.',
      feature1: '지속적인 문화 진단',
      feature2: '동적 문화 프로필',
      feature3: '맞춤형 채용 솔루션',
      cta: '시작하기',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href={user ? '/dashboard' : '/'}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {content[language].title}
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSelector onChange={setLanguage} />
            <AuthButton
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              signInText={language === 'en' ? 'Sign In' : '로그인'}
              signOutText={language === 'en' ? 'Sign Out' : '로그아웃'}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              {content[language].subtitle}
            </h1>
            <p className="text-xl mb-12 text-gray-700 max-w-2xl mx-auto">
              {content[language].description}
            </p>
            {user ? (
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl"
              >
                {content[language].cta}
              </Link>
            ) : (
              <AuthButton
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl"
                signInText={content[language].cta}
              />
            )}
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                content[language].feature1,
                content[language].feature2,
                content[language].feature3,
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-60 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-6 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {feature}
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white bg-opacity-80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Outio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
