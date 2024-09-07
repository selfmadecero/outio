'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';

type ContentType = {
  [key in 'en' | 'ko']: {
    title: string;
    noProfile: string;
    individualismVsCollectivism: string;
    customerCentricity: string;
    leadershipStyle: string;
    performanceManagement: string;
    workEnvironment: string;
    innovationVsStability: string;
    flexibilityVsStructure: string;
    decisionMakingStyle: string;
    workLifeBalance: string;
    communicationStyle: string;
    learningAndDevelopment: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Culture Profile',
    noProfile: 'No culture profile available.',
    individualismVsCollectivism: 'Individualism vs Collectivism',
    customerCentricity: 'Customer Centricity',
    leadershipStyle: 'Leadership Style',
    performanceManagement: 'Performance Management',
    workEnvironment: 'Work Environment',
    innovationVsStability: 'Innovation vs Stability',
    flexibilityVsStructure: 'Flexibility vs Structure',
    decisionMakingStyle: 'Decision Making Style',
    workLifeBalance: 'Work-Life Balance',
    communicationStyle: 'Communication Style',
    learningAndDevelopment: 'Learning and Development',
  },
  ko: {
    title: '문화 프로필',
    noProfile: '사용 가능한 문화 프로필이 없습니다.',
    individualismVsCollectivism: '개인주의 vs 집단주의',
    customerCentricity: '고객 중심주의',
    leadershipStyle: '리더십 스타일',
    performanceManagement: '성과 관리',
    workEnvironment: '근무 환경',
    innovationVsStability: '혁신 vs 안정',
    flexibilityVsStructure: '유연성 vs 구조',
    decisionMakingStyle: '의사결정 스타일',
    workLifeBalance: '일-삶 균형',
    communicationStyle: '의사소통 스타일',
    learningAndDevelopment: '학습 및 개발',
  },
};

const sampleProfile = {
  individualismVsCollectivism: 65,
  customerCentricity: 80,
  leadershipStyle: 70,
  performanceManagement: 75,
  workEnvironment: 85,
  innovationVsStability: 60,
  flexibilityVsStructure: 55,
  decisionMakingStyle: 72,
  workLifeBalance: 78,
  communicationStyle: 68,
  learningAndDevelopment: 82,
};

const profileDescriptions = {
  en: {
    individualismVsCollectivism:
      'Your organization balances individual contributions with team collaboration, fostering a culture that values both personal achievement and collective success.',
    customerCentricity:
      'Your company has a strong focus on customer needs, indicating a culture that prioritizes customer satisfaction and experience.',
    leadershipStyle:
      'Leadership in your organization tends to be participative, encouraging input from team members while maintaining clear direction.',
    performanceManagement:
      'Your performance management approach balances accountability with support, promoting growth and achievement.',
    workEnvironment:
      'Your work environment is highly positive, fostering employee engagement and productivity.',
    innovationVsStability:
      'Your organization maintains a good balance between innovation and stability, adapting to change while preserving core strengths.',
    flexibilityVsStructure:
      'Your company leans slightly towards structure, providing clear processes while allowing some flexibility.',
    decisionMakingStyle:
      'Decision-making in your organization is relatively data-driven, with a healthy consideration for intuition and experience.',
    workLifeBalance:
      'Your company culture strongly supports work-life balance, which can lead to higher employee satisfaction and retention.',
    communicationStyle:
      'Communication in your organization is fairly open, with room for improvement in transparency and frequency.',
    learningAndDevelopment:
      'Your organization places a high value on learning and development, supporting employee growth and adaptability.',
  },
  ko: {
    individualismVsCollectivism:
      '귀사는 개인의 기여와 팀 협업의 균형을 잘 맞추고 있어, 개인의 성취와 집단의 성공을 모두 중요하게 여기는 문화를 조성하고 있습니다.',
    customerCentricity:
      '귀사는 고객 니즈에 대한 강한 초점을 가지고 있어, 고객 만족과 경험을 우선시하는 문화를 가지고 있습니다.',
    leadershipStyle:
      '귀사의 리더십은 참여적인 경향이 있어, 팀 구성원들의 의견을 장려하면서도 명확한 방향성을 유지하고 있습니다.',
    performanceManagement:
      '귀사의 성과 관리 접근 방식은 책임과 지원의 균형을 잘 맞추어, 성장과 성취를 촉진하고 있습니다.',
    workEnvironment:
      '귀사의 근무 환경은 매우 긍정적이어서, 직원들의 참여와 생산성을 높이고 있습니다.',
    innovationVsStability:
      '귀사는 혁신과 안정성 사이의 균형을 잘 유지하고 있어, 변화에 적응하면서도 핵심 강점을 보존하고 있습니다.',
    flexibilityVsStructure:
      '귀사는 구조에 약간 더 기울어 있어, 명확한 프로세스를 제공하면서도 일정 수준의 유연성을 허용하고 있습니다.',
    decisionMakingStyle:
      '귀사의 의사결정은 비교적 데이터 중심적이며, 직관과 경험도 적절히 고려하고 있습니다.',
    workLifeBalance:
      '귀사의 문화는 일-삶의 균형을 강력히 지원하고 있어, 이는 높은 직원 만족도와 유지율로 이어질 수 있습니다.',
    communicationStyle:
      '귀사의 의사소통은 꽤 개방적이지만, 투명성과 빈도 면에서 개선의 여지가 있습니다.',
    learningAndDevelopment:
      '귀사는 학습과 개발에 높은 가치를 두고 있어, 직원들의 성장과 적응력을 지원하고 있습니다.',
  },
};

export default function CultureProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(sampleProfile);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    try {
      const docRef = doc(db, 'cultureProfiles', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log('No culture profile found, using sample data.');
        setProfile(sampleProfile);
      }
    } catch (error) {
      console.error('Error fetching culture profile:', error);
      setProfile(sampleProfile);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileItem = (
    key: keyof typeof sampleProfile,
    value: number
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {content[language][key]}
      </h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
              {value}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          ></motion.div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {profileDescriptions[language][key]}
      </p>
    </motion.div>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500"
        >
          {content[language].title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(profile).map(([key, value]) =>
            renderProfileItem(
              key as keyof typeof sampleProfile,
              value as number
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
