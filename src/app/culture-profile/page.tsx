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
      // 프로필이 없는 경우 처리
      console.log('No culture profile found!');
    }
  };

  const content = {
    en: {
      title: 'Culture Profile',
      noProfile:
        'No culture profile available yet. Complete a survey to generate your profile.',
      decisionMaking: 'Decision Making',
      communication: 'Communication',
      innovation: 'Innovation',
      workLifeBalance: 'Work-Life Balance',
    },
    ko: {
      title: '문화 프로필',
      noProfile:
        '아직 문화 프로필이 없습니다. 설문을 완료하여 프로필을 생성하세요.',
      decisionMaking: '의사결정',
      communication: '의사소통',
      innovation: '혁신',
      workLifeBalance: '일-삶 균형',
    },
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem
              title={content[language].decisionMaking}
              value={profile.decisionMaking}
            />
            <ProfileItem
              title={content[language].communication}
              value={profile.communication}
            />
            <ProfileItem
              title={content[language].innovation}
              value={profile.innovation}
            />
            <ProfileItem
              title={content[language].workLifeBalance}
              value={profile.workLifeBalance}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function ProfileItem({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <p className="text-right mt-1 text-sm text-gray-700">{value}%</p>
    </div>
  );
}
