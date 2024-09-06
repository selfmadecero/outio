'use client';

import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';

export default function Auth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const content = {
    en: {
      title: 'Welcome to Outio',
      subtitle: 'Sign in to start optimizing your hiring process',
      description:
        'Outio helps you understand your company culture and find the perfect candidates that fit your organization.',
      signInWithGoogle: 'Sign in with Google',
      backToHome: 'Back to Home',
    },
    ko: {
      title: 'Outio에 오신 것을 환영합니다',
      subtitle: '로그인하여 채용 프로세스 최적화를 시작하세요',
      description:
        'Outio는 귀사의 기업 문화를 이해하고 조직에 맞는 완벽한 후보자를 찾는 데 도움을 줍니다.',
      signInWithGoogle: '구글로 로그인',
      backToHome: '홈으로 돌아가기',
    },
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {content[language].title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {content[language].subtitle}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {content[language].signInWithGoogle}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <p className="mt-2 text-center text-sm text-gray-600">
            {content[language].description}
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {content[language].backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
