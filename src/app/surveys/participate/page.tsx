'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

// content 객체의 타입 정의
type ContentType = {
  [key in 'en' | 'ko']: {
    title: string;
    submit: string;
    success: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Participate in Survey',
    submit: 'Submit Survey',
    success: 'Survey submitted successfully!',
  },
  ko: {
    title: '설문조사 참여',
    submit: '설문조사 제출',
    success: '설문조사가 성공적으로 제출되었습니다!',
  },
};

export default function ParticipateSurvey() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profileRef = doc(db, 'profiles', 'currentUserId'); // Replace with actual user ID
      const newProfile = {
        surveyAnswers: answers,
        lastUpdated: new Date(),
      };
      await setDoc(profileRef, newProfile, { merge: true });

      alert(content[language].success);
      router.push('/');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('An error occurred while submitting the survey.');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{content[language].title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Add your survey questions here */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {content[language].submit}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
