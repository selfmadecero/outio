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
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  InformationCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

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
    description: string;
    lastUpdated: string;
    radarChart: string;
    barChart: string;
    whatIsCultureProfile: string;
    cultureProfileExplanation: string;
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
    description:
      "Your organization's unique cultural fingerprint based on employee feedback",
    lastUpdated: 'Last updated',
    radarChart: 'Culture Profile Overview',
    barChart: 'Detailed Culture Metrics',
    whatIsCultureProfile: 'What is a Culture Profile?',
    cultureProfileExplanation:
      "A Culture Profile is a data-driven representation of your organization's values, behaviors, and practices. It's created from regular pulse surveys completed by your employees, providing real-time insights into your company's cultural dynamics. This profile helps in understanding your organization's strengths, identifying areas for improvement, and ensuring that new hires align well with your unique culture.",
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
    description: '직원들의 피드백을 바탕으로 한 귀사의 고유한 문화적 특성',
    lastUpdated: '마지막 업데이트',
    radarChart: '문화 프로필 개요',
    barChart: '상세 문화 지표',
    whatIsCultureProfile: '문화 프로필이란?',
    cultureProfileExplanation:
      '문화 프로필은 조직의 가치, 행동, 관행을 데이터 기반으로 표현한 것입니다. 직원들이 정기적으로 참여하는 펄스 설문조사를 통해 생성되며, 회사의 문화적 역동성에 대한 실시간 인사이트를 제공합니다. 이 프로필은 조직의 강점을 이해하고, 개선이 필요한 영역을 식별하며, 새로운 인재가 귀사의 고유한 문화와 잘 맞는지 확인하는 데 도움을 줍니다.',
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

const renderProfileItem = (key: keyof typeof sampleProfile, value: number) => {
  // 여기에 프로필 항목을 렌더링하는 로직을 구현하세요
  return (
    <div key={key}>
      <h3>{content[language][key]}</h3>
      <p>{value}</p>
    </div>
  );
};

export default function CultureProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(sampleProfile);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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
        setLastUpdated(docSnap.data().lastUpdated?.toDate() || new Date());
      } else {
        console.log('No culture profile found, using sample data.');
        setProfile(sampleProfile);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching culture profile:', error);
      setProfile(sampleProfile);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  const radarData = Object.entries(profile).map(([key, value]) => ({
    subject: content[language][key as keyof typeof content.en],
    A: value,
    fullMark: 100,
  }));

  const barData = Object.entries(profile).map(([key, value]) => ({
    name: content[language][key as keyof typeof content.en],
    value: value as number,
  }));

  const symmetricBarData = Object.entries(profile).map(([key, value]) => ({
    name: content[language][key as keyof typeof content.en],
    value: value as number,
  }));

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            {content[language].title}
          </h1>
          <p className="text-center text-gray-600 mb-4">
            {content[language].description}
          </p>
          <div className="flex justify-center items-center text-sm text-gray-500">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            {content[language].lastUpdated}: {lastUpdated?.toLocaleDateString()}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {content[language].radarChart}
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Culture Profile"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {content[language].barChart}
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Symmetric Bar Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={symmetricBarData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[-50, 50]} />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {symmetricBarData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value > 0 ? '#82ca9d' : '#8884d8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(profile).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {content[language][key as keyof typeof content.en]}
              </h3>
              <p className="text-gray-600">{value}</p>
              <p className="text-gray-600 mt-4">
                {
                  profileDescriptions[language][
                    key as keyof typeof profileDescriptions.en
                  ]
                }
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
