'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../components/DashboardLayout';

export default function Feedback() {
  const [user, setUser] = useState<User | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const content = {
    en: {
      title: 'Provide Feedback',
      ratingLabel: 'How would you rate your experience?',
      commentLabel: 'Do you have any additional comments?',
      commentPlaceholder: 'Your feedback helps us improve our service',
      submit: 'Submit Feedback',
      success: 'Thank you for your feedback!',
    },
    ko: {
      title: '피드백 제공',
      ratingLabel: '서비스 경험을 어떻게 평가하시겠습니까?',
      commentLabel: '추가 의견이 있으신가요?',
      commentPlaceholder: '귀하의 피드백은 서비스 개선에 도움이 됩니다',
      submit: '피드백 제출',
      success: '피드백을 주셔서 감사합니다!',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await setDoc(doc(db, 'feedback', `${user.uid}_${Date.now()}`), {
        userId: user.uid,
        rating,
        comment,
        createdAt: new Date(),
      });
      alert(content[language].success);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content[language].title}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {content[language].ratingLabel}
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {content[language].commentLabel}
            </label>
            <textarea
              id="comment"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
              placeholder={content[language].commentPlaceholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {content[language].submit}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
