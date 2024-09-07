import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import confetti from 'canvas-confetti';

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

  const content = {
    en: {
      title: 'Join Our Waitlist',
      description: 'Be the first to know when we launch!',
      submitButton: 'Join Waitlist',
      thankYou: 'Thank you for joining our waitlist!',
      updateMessage: "We'll keep you updated on our progress.",
    },
    ko: {
      title: '대기자 명단에 참여하세요',
      description: '출시 소식을 가장 먼저 받아보세요!',
      submitButton: '대기자 명단 참여',
      thankYou: '웨잇리스트 등록해주셔서 감사합니다!',
      updateMessage: '런칭 소식을 빠르게 알려드릴게요.',
    },
  };

  useEffect(() => {
    if (submitted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'waitlist', user.uid), {
          email: user.email,
          joinedAt: new Date(),
        });
        setSubmitted(true);
      } catch (error) {
        console.error('Error adding user to waitlist:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300"
              >
                {content[language].submitButton}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600 mb-4">
              {content[language].thankYou}
            </p>
            <p className="text-gray-600">{content[language].updateMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
