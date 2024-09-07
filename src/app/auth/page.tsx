'use client';

import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'; // GitHub 아이콘 대신 Google 아이콘을 import

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
                <FcGoogle className="h-5 w-5" /> {/* 여기를 수정했습니다 */}
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
