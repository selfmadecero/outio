'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../components/DashboardLayout';

export default function CultureProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
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
    } else {
      console.log('No culture profile found!');
    }
  };

  const content = {
    en: {
      title: 'Culture Profile',
      noProfile:
        'No culture profile available yet. Complete a survey to generate your profile.',
      individualismVsCollectivism: 'Individualism vs Collectivism',
      customerCentricity: 'Customer Centricity',
      leadershipStyle: 'Leadership Style',
      performanceManagement: 'Performance Management and Compensation',
      workEnvironment: 'Work Environment',
      flexibilityVsStructure: 'Flexibility vs Structure',
      decisionMakingStyle: 'Decision-making Style',
      workLifeBalance: 'Work-Life Balance',
      communicationStyle: 'Communication Style',
      learningAndDevelopment: 'Learning and Development',
      innovationVsStability: 'Innovation vs Stability',
    },
    ko: {
      title: '문화 프로필',
      noProfile:
        '아직 문화 프로필이 없습니다. 설문을 완료하여 프로필을 생성하세요.',
      individualismVsCollectivism: '개인주의 vs 집단주의',
      customerCentricity: '고객 중심성',
      leadershipStyle: '리더십 스타일',
      performanceManagement: '성과 관리 및 보상',
      workEnvironment: '근무 환경',
      flexibilityVsStructure: '유연성 vs 구조',
      decisionMakingStyle: '의사결정 스타일',
      workLifeBalance: '일-삶 균형',
      communicationStyle: '의사소통 스타일',
      learningAndDevelopment: '학습 및 발전',
      innovationVsStability: '혁신 vs 안정성',
    },
  };

  const renderProfileItem = (key: string, value: number) => (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{content[language][key]}</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              {value}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${value}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content[language].title}
        </h2>
        {!profile ? (
          <p className="text-center text-gray-700">
            {content[language].noProfile}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderProfileItem(
              'individualismVsCollectivism',
              profile.individualismVsCollectivism
            )}
            {renderProfileItem(
              'customerCentricity',
              profile.customerCentricity
            )}
            {renderProfileItem('leadershipStyle', profile.leadershipStyle)}
            {renderProfileItem(
              'performanceManagement',
              profile.performanceManagement
            )}
            {renderProfileItem('workEnvironment', profile.workEnvironment)}
            {renderProfileItem(
              'flexibilityVsStructure',
              profile.flexibilityVsStructure
            )}
            {renderProfileItem(
              'decisionMakingStyle',
              profile.decisionMakingStyle
            )}
            {renderProfileItem('workLifeBalance', profile.workLifeBalance)}
            {renderProfileItem(
              'communicationStyle',
              profile.communicationStyle
            )}
            {renderProfileItem(
              'learningAndDevelopment',
              profile.learningAndDevelopment
            )}
            {renderProfileItem(
              'innovationVsStability',
              profile.innovationVsStability
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
