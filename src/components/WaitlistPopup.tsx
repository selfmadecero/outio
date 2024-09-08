import React, { useState, useEffect, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import dynamic from 'next/dynamic';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ko';
}

export default function WaitlistPopup({
  isOpen,
  onClose,
  language,
}: WaitlistPopupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const content = {
    en: {
      title: 'Join Our Waitlist',
      description: 'Be the first to know when we launch!',
      submitButton: 'Join Waitlist',
      thankYou: 'Thank you for joining our waitlist!',
      updateMessage: "We'll keep you updated on our progress.",
      emailNotice: "We'll send important updates to your email address:",
      benefits: [
        'Early access to our platform',
        'Exclusive offers for waitlist members',
        'Regular updates on our development',
        'Opportunity to provide feedback and shape our product',
      ],
      additionalInfo: [
        "You're now part of an exclusive group of early adopters.",
        "We're working hard to bring you an amazing product.",
        'Your input will be invaluable in shaping our platform.',
      ],
      errorMessage: 'An error occurred. Please try again.',
      loginRequired: 'Login is required to join the waitlist.',
    },
    ko: {
      title: '대기자 명단에 참여하세요',
      description: '출시 소식을 가장 먼저 받아보세요!',
      submitButton: '대기자 명단 참여',
      thankYou: '웨이트리스트 등록해주셔서 감사합니다!',
      updateMessage: '개발 진행 상황을 계속 알려드리겠습니다.',
      emailNotice: '다음 이메일 주소로 중요한 업데이트를 보내드리겠습니다:',
      benefits: [
        '플랫폼 얼리 액세스',
        '웨이트리스트 회원 전용 특별 혜택',
        '개발 진행 상황 정기 업데이트',
        '피드백 제공 및 제품 개선에 참여할 기회',
      ],
      additionalInfo: [
        '여러분은 이제 얼리 어답터 그룹의 일원입니다.',
        '우리는 여러분께 놀라운 제품을 선보이기 위해 열심히 노력하고 있습니다.',
        '여러분의 의견은 우리 플랫폼을 만드는 데 매우 중요합니다.',
      ],
      errorMessage: '오류가 발생했습니다. 다시 시도해 주세요.',
      loginRequired: '웨이트리스트 참여를 위해 로그인이 필요합니다.',
    },
  };

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000); // 5초 후 폭죽 효과 종료
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (submitted) {
      triggerConfetti();
    }
  }, [submitted, triggerConfetti]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'waitlist', user.uid), {
          email: user.email,
          joinedAt: serverTimestamp(),
          userId: user.uid,
          displayName: user.displayName,
        });
        setSubmitted(true);
      } catch (error: unknown) {
        console.error('Error adding user to waitlist:', error);
        if (error instanceof Error) {
          setError(`${content[language].errorMessage} (${error.message})`);
        } else {
          setError(content[language].errorMessage);
        }
      }
    } else {
      console.error('No user is signed in');
      setError(content[language].loginRequired);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {showConfetti && <Confetti recycle={false} />}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {content[language].title}
        </h2>
        {!submitted ? (
          <>
            <p className="text-gray-600 mb-6 text-center">
              {content[language].description}
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              {content[language].benefits.map((benefit, index) => (
                <li key={index} className="mb-2">
                  {benefit}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300"
              >
                {content[language].submitButton}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600 mb-4">
              {content[language].thankYou}
            </p>
            <p className="text-gray-600 mb-4">
              {content[language].updateMessage}
            </p>
            <p className="text-gray-600 mb-2">
              {content[language].emailNotice}
            </p>
            <p className="font-semibold mb-4">{auth.currentUser?.email}</p>
            <ul className="text-left text-gray-600 mb-4">
              {content[language].additionalInfo.map((info, index) => (
                <li key={index} className="mb-2">
                  • {info}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
