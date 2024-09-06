'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../components/DashboardLayout';

export default function Hiring() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchCultureProfile(user.uid);
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchCultureProfile = async (userId: string) => {
    const docRef = doc(db, 'cultureProfiles', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
      generateQuestions(docSnap.data());
    } else {
      console.log('No culture profile found!');
    }
  };

  const generateQuestions = (profile: any) => {
    const generatedQuestions = [
      `Our company values ${
        profile.decisionMaking > 50 ? 'quick' : 'careful'
      } decision making. Can you describe a situation where you had to make a ${
        profile.decisionMaking > 50 ? 'quick' : 'careful'
      } decision?`,
      `We have a ${
        profile.communication > 50 ? 'very open' : 'structured'
      } communication style. How do you prefer to communicate with your team and superiors?`,
      `Innovation is ${
        profile.innovation > 50 ? 'highly' : 'moderately'
      } valued in our company. Can you give an example of how you've contributed to innovation in your previous roles?`,
      `We believe in a ${
        profile.workLifeBalance > 50 ? 'strong' : 'flexible'
      } work-life balance. How do you manage your work-life balance?`,
      'Can you describe a situation where you had to adapt to a new company culture? How did you handle it?',
    ];
    setQuestions(generatedQuestions);
  };

  const content = {
    en: {
      title: 'Hiring',
      description:
        'Manage your hiring process and generate interview questions here.',
      noProfile:
        'No culture profile available. Please complete a survey first.',
      generateMore: 'Generate More Questions',
    },
    ko: {
      title: '채용',
      description: '채용 프로세스를 관리하고 면접 질문을 생성하세요.',
      noProfile: '문화 프로필이 없습니다. 먼저 설문을 완료해 주세요.',
      generateMore: '추가 질문 생성',
    },
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content[language].title}
        </h2>
        <p className="text-center text-gray-700 mb-8">
          {content[language].description}
        </p>
        {!profile ? (
          <p className="text-center text-gray-700">
            {content[language].noProfile}
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="bg-white rounded-lg p-4 shadow-md">
                  <p className="text-gray-800">{question}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => generateQuestions(profile)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {content[language].generateMore}
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
