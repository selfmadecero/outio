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
  LineChart,
  Line,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  InformationCircleIcon,
  ArrowPathIcon,
  LightBulbIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChartPieIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/solid';

// content 객체의 타입 정의에 strategicRecommendations 추가
type ContentType = {
  title: string;
  description: string;
  lastUpdated: string;
  cultureProfileOverview: string;
  whatIsCultureProfile: string;
  cultureProfileExplanation: string;
  collaborationIndex: string;
  innovationIndex: string;
  customerFocusIndex: string;
  adaptabilityIndex: string;
  leadershipEffectiveness: string;
  employeeEngagement: string;
  learningCulture: string;
  decisionMakingEfficiency: string;
  findCandidates: string;
  cultureSummary: string;
  cultureSummaryText: string;
  strengthsAndWeaknesses: string;
  strengths: string;
  weaknesses: string;
  industryComparison: string;
  trendAnalysis: string;
  trendAnalysisText: string;
  improvementSuggestions: string;
  improvementSuggestionsText: string;
  cultureType: string;
  cultureTypeText: string;
  innovationDriven: string;
  collaborationCentric: string;
  customerCentric: string;
  learningOriented: string;
  symmetricBarChart: string;
  cultureDimensions: string;
  cultureTags: string[];
  overallCultureScore: string;
  overallCultureScoreDescription: string;
  overallCultureScoreInterpretation: string;
  strengthsWeaknessesDescription: string;
  overviewExplanation: string;
  overviewDescription: string;
  cultureDimensionsDescription: string;
  cultureDimensionsInterpretation: string;
  yourCompany: string;
  industryAverage: string;
  keyInsights: string;
  comparisonInsight: (
    dimension: string,
    difference: number,
    isHigher: boolean
  ) => string;
  actionableRecommendations: string;
  industryComparisonRecommendations: string[];
  industryComparisonDescription: string;
  difference: string;
  comparisonWithIndustry: string;
  insightExplanation: (dimension: string, difference: number) => string;
  strategicRecommendations: string;
};

const content: Record<'en' | 'ko', ContentType> = {
  en: {
    title: 'Culture Profile',
    description:
      "Your organization's unique cultural fingerprint based on employee feedback",
    lastUpdated: 'Last updated',
    cultureProfileOverview: 'Culture Profile Overview',
    whatIsCultureProfile: 'What is a Culture Profile?',
    cultureProfileExplanation:
      "A Culture Profile is a data-driven representation of your organization's values, behaviors, and practices. It's created from regular pulse surveys completed by your employees, providing real-time insights into your company's cultural dynamics. This profile helps in understanding your organization's strengths, identifying areas for improvement, and ensuring that new hires align well with your unique culture.",
    collaborationIndex: 'Collaboration Index',
    innovationIndex: 'Innovation Index',
    customerFocusIndex: 'Customer Focus Index',
    adaptabilityIndex: 'Adaptability Index',
    leadershipEffectiveness: 'Leadership Effectiveness',
    employeeEngagement: 'Employee Engagement',
    learningCulture: 'Learning Culture',
    decisionMakingEfficiency: 'Decision Making Efficiency',
    findCandidates: 'Find Candidates for Our Culture',
    cultureSummary: 'Culture Profile Summary',
    cultureSummaryText:
      "Your organization's culture exhibits a strong emphasis on innovation and collaboration. Particularly, customer-centric approach and learning culture are notable strengths. The decision-making process prefers a participative approach, and there is an open communication culture. However, there is room for improvement in work-life balance and structured processes.",
    strengthsAndWeaknesses: 'Key Strengths and Areas for Improvement',
    strengths: 'Strengths',
    weaknesses: 'Areas for Improvement',
    industryComparison: 'Comparison with Industry Average',
    trendAnalysis: 'Culture Index Trend Analysis',
    trendAnalysisText:
      "Over the past 5 months, your organization's overall culture index has been steadily increasing. There have been significant improvements in employee engagement and learning culture.",
    improvementSuggestions: 'Tailored Improvement Suggestions',
    improvementSuggestionsText: `Improvement Suggestions:
      - Decision Process Improvement: Consider implementing a framework for faster decision-making
      - Enhance Innovation Culture: Organize regular idea sharing sessions or hackathon events
      - Improve Adaptability: Encourage cross-functional team activities and introduce job rotation programs
      - Enhance Work-Life Balance: Expand flexible work arrangements and strengthen wellness programs`,
    cultureType: 'Culture Type Classification',
    cultureTypeText:
      "Your organization's culture strongly exhibits characteristics of both 'Innovation-Driven' and 'Collaboration-Centric'. This is a culture that values creative ideas while also emphasizing teamwork and execution through collaboration.",
    innovationDriven:
      'Innovation-Driven: Actively embraces new ideas and changes',
    collaborationCentric:
      'Collaboration-Centric: Emphasizes teamwork and open communication for problem-solving',
    customerCentric: 'Customer-Centric: Quickly responds to customer needs',
    learningOriented:
      'Learning-Oriented: Focuses on continuous growth and development',
    symmetricBarChart: 'Symmetric Bar Chart',
    cultureDimensions: 'Culture Dimensions',
    cultureTags: [
      'Innovation',
      'Collaboration',
      'Customer-Centric',
      'Learning',
    ],
    overallCultureScore: 'Overall Culture Score',
    overallCultureScoreDescription:
      'A composite score reflecting the overall health and strength of your organizational culture.',
    overallCultureScoreInterpretation:
      'Your score indicates a strong, well-developed culture with some areas for improvement.',
    strengthsWeaknessesDescription:
      "These are the key strengths and areas for improvement based on your organization's culture profile. Strengths are areas where your organization excels, while areas for improvement are areas that could be enhanced to further strengthen your culture.",
    overviewExplanation: 'Culture Profile Overview Explanation',
    overviewDescription:
      'This is an explanation of the Culture Profile Overview section.',
    cultureDimensionsDescription:
      "This chart represents the balance between different dimensions of your organization's culture. Each bar indicates the strength of a particular dimension, with the left side representing one aspect and the right side representing the opposite aspect. The center of the bar indicates the overall balance between the two aspects.",
    cultureDimensionsInterpretation:
      "This chart provides insights into the balance and distribution of various dimensions of your organization's culture. It helps you understand the strengths and areas for improvement in each dimension.",
    yourCompany: 'Your Company',
    industryAverage: 'Industry Average',
    keyInsights: 'Key Insights',
    comparisonInsight: (
      dimension: string,
      difference: number,
      isHigher: boolean
    ) =>
      `Your ${dimension} is ${difference.toFixed(1)} points ${
        isHigher ? 'higher' : 'lower'
      } than the industry average.`,
    actionableRecommendations: 'Actionable Recommendations',
    industryComparisonRecommendations: [
      'Leverage your strengths in areas where you exceed the industry average to create competitive advantages.',
      'Develop targeted improvement plans for dimensions where you fall below the industry average.',
      'Regularly benchmark your culture metrics against industry standards to track progress and identify emerging trends.',
      'Share insights from this comparison with your team to foster a culture of continuous improvement.',
    ],
    industryComparisonDescription: '산업 평균과의 비교 설명',
    difference: 'Difference',
    comparisonWithIndustry: 'Comparison with Industry',
    insightExplanation: (dimension, difference) =>
      `The ${dimension} is ${Math.abs(difference)}% ${
        difference > 0 ? 'higher' : 'lower'
      } than industry average.`,
    strategicRecommendations: 'Strategic Recommendations',
  },
  ko: {
    title: '문화 프로필',
    description: '직원들의 피드백을 바탕으로 한 귀사의 고유한 문화적 특성',
    lastUpdated: '최종 업데이트',
    cultureProfileOverview: '문화 프로필 개요',
    whatIsCultureProfile: '문화 프로필이란?',
    cultureProfileExplanation:
      '문화 프로필은 조직의 가치관, 행동 양식, 그리고 관행을 데이터에 기반하여 표현한 것입니다. 직원들이 정기적으로 참여하는 펄스 설문조사를 통해 생성되며, 회사의 문화적 역동성에 대한 실시간 인사이트를 제공합니다. 이 프로필은 조직의 강점을 이해하고, 개선이 필요한 영역을 식별하며, 새로운 인재가 귀사의 고유한 문화와 잘 부합하는지 확인하는 데 도움을 줍니다.',
    collaborationIndex: '협업 지수',
    innovationIndex: '혁신 지수',
    customerFocusIndex: '고객 중심 지수',
    adaptabilityIndex: '적응성 지수',
    leadershipEffectiveness: '리더십 효과성',
    employeeEngagement: '직원 참여도',
    learningCulture: '학습 문화',
    decisionMakingEfficiency: '의사결정 효율성',
    findCandidates: '우리 문화에 적합한 인재 찾기',
    cultureSummary: '문화 프로필 요약',
    cultureSummaryText:
      '귀사의 문화는 혁신과 협력을 중시하는 특성을 강하게 보입니다. 특히 고객 중심적인 접근과 학습 문화가 주목할 만한 강점으로 나타났습니다. 의사결정 과정에서는 참여적 방식을 선호하며, 개방적 소통 문화를 가지고 있습니다. 다만, 일과 삶의 균형 및 구조화된 프로세스 측면에서는 개선의 여지가 있습니다.',
    strengthsAndWeaknesses: '주요 강점 및 개선 영역',
    strengths: '강점',
    weaknesses: '개선 영역',
    industryComparison: '산업 평균과의 비교',
    trendAnalysis: '문화 지수 추세 분석',
    trendAnalysisText:
      '최근 5개월간 귀사의 전반적인 문화 지수가 꾸준히 상승하고 있습니다. 특히 직원 참여도와 학습 문화 측면에서 큰 개선이 있었습니다.',
    improvementSuggestions: '맞춤형 개선 제안',
    improvementSuggestionsText: `개선 제안:
      - 의사결정 프로세스 개선: 신속한 의사결정을 위한 프레임워크 도입 고려
      - 혁신 문화 강화: 정기적인 아이디어 공유 세션 또는 해커톤 이벤트 개최
      - 적응성 향상: 부서 간 협업 활동 장려 및 직무 순환 프로그램 도입
      - 일-삶 균형 개선: 유연근무제 확대 및 웰빙 프로그램 강화`,
    cultureType: '문화 유형 분류',
    cultureTypeText:
      '귀사의 문화는 "혁신 주도형"과 "협력 중심형"의 특성을 강하게 보이고 있습니다. 이는 창의적인 아이디어를 중시하면서도 팀워크를 통한 실행을 중요하게 여기는 문화입니다.',
    innovationDriven: '혁신 주도: 새로운 아이디어와 변화를 적극적으로 수용',
    collaborationCentric:
      '협력 중심형: 팀워크와 개방적 소통을 통한 문제 해결 강조',
    customerCentric: '고객 중심형: 고객 니즈에 신속하게 대응하는 문화',
    learningOriented: '학습 지향형: 지속적인 성장과 발전에 초점을 맞추는 문화',
    symmetricBarChart: '대칭 막대 차트',
    cultureDimensions: '문화 차원',
    cultureTags: ['혁신', '협업', '고객 중심', '학습'],
    overallCultureScore: '전체 문화 점수',
    overallCultureScoreDescription:
      '조직 문화의 전반적인 건강도와 강점을 반영하는 종합 점수입니다.',
    overallCultureScoreInterpretation:
      '귀사의 점수는 잘 발달된 강한 문화를 나타내며, 일부 개선 영역이 있음을 시사합니다.',
    strengthsWeaknessesDescription:
      '이는 귀사의 문화 프로필을 기반으로 한 주요 강점과 개선 영역입니다. 강점은 귀사가 뛰어난 분야이며, 개선 영역은 문화를 더욱 강화하기 위해 향상시킬 수 있는 분야입니다.',
    overviewExplanation: '문화 프로필 개요 설명',
    overviewDescription: '이는 문화 프로필 개요 섹션에 대한 설명입니다.',
    cultureDimensionsDescription:
      '이 차트는 조직의 문화 차원 간의 균형을 나타냅니다. 각 막대는 특정 차원의 강점을 나타내며, 왼쪽은 한 측면을, 오른쪽은 반대 측면을 나타냅니다. 막대의 중앙은 두 측면 간의 전반적인 균형을 나타냅니다.',
    cultureDimensionsInterpretation:
      '이 차트는 조직의 문화 차원 간의 균형과 분포에 대한 통찰력을 제공합니다. 각 차원의 강점과 개선 영역을 이해하는 데 도움이 됩니다.',
    yourCompany: '귀사',
    industryAverage: '산업 평균',
    keyInsights: '주요 인사이트',
    comparisonInsight: (
      dimension: string,
      difference: number,
      isHigher: boolean
    ) =>
      `귀사의 ${dimension}은(는) 산업 평균보다 ${difference.toFixed(
        1
      )} 포인트 ${isHigher ? '높습니다' : '낮습니다'}.`,
    actionableRecommendations: '실행 가능한 제안',
    industryComparisonRecommendations: [
      '산업 평균을 초과하는 영역에서의 강점을 활용하여 경쟁 우위를 창출하세요.',
      '산업 평균에 미치지 못하는 차원에 대해 목표 지향적인 개선 계획을 수립하세요.',
      '진행 상황을 추적하고 새로운 트렌드를 파악하기 위해 문화 지표를 정기적으로 산업 표준과 비교하요.',
      '이 비교에서 얻은 인사이트를 팀과 공유하여 지속적인 개선 문화를 조성하세요.',
    ],
    industryComparisonDescription: '산업 평균과의 비교 설명',
    difference: '차이',
    comparisonWithIndustry: '산업 평균과의 비교',
    insightExplanation: (dimension, difference) =>
      `${dimension}은(는) 업계 평균보다 ${Math.abs(difference)}% ${
        difference > 0 ? '높습니다' : '낮습니다'
      }.`,
    strategicRecommendations: '전략적 권장사항',
  },
};

const sampleProfile = {
  collaborationIndex: 75,
  innovationIndex: 68,
  customerFocusIndex: 82,
  adaptabilityIndex: 70,
  leadershipEffectiveness: 72,
  employeeEngagement: 78,
  learningCulture: 80,
  decisionMakingEfficiency: 65,
};

const profileDescriptions = {
  en: {
    collaborationIndex:
      'Measures the level of teamwork and collective effort within the organization.',
    innovationIndex:
      "Indicates the company's capacity for creativity and new ideas.",
    customerFocusIndex:
      'Reflects how well the organization prioritizes customer needs and satisfaction.',
    adaptabilityIndex:
      "Shows the company's ability to adjust to changes in the market or industry.",
    leadershipEffectiveness:
      'Evaluates the overall impact and quality of leadership within the organization.',
    employeeEngagement:
      'Measures the level of employee commitment, motivation, and satisfaction.',
    learningCulture:
      'Indicates how well the organization supports continuous learning and development.',
    decisionMakingEfficiency:
      'Reflects the speed and effectiveness of the decision-making processes.',
  },
  ko: {
    collaborationIndex: '조직 내 팀워크와 집단적 노력의 수준을 측정합니다.',
    innovationIndex: '회사의 창의성과 새로운 아이디어 창출 능력을 나타냅��다.',
    customerFocusIndex:
      '조직이 고객 니즈와 만족도를 얼마나 잘 우선시하는지 반영합니다.',
    adaptabilityIndex:
      '시장이나 산업의 변화에 대한 회사의 적응 능력을 보여줍니다.',
    leadershipEffectiveness:
      '조직 내 리더십의 전반적인 영향력과 질을 평가합니다.',
    employeeEngagement: '직원들의 헌신, 동기부여, 만족도 수준을 측정합니다.',
    learningCulture:
      '조직이 지속적인 학습과 개발을 얼마나 잘 지원하는지 나타냅니다.',
    decisionMakingEfficiency: '의결정 과정의 속도와 효과성을 반영합니다.',
  },
};

const cultureDimensions = {
  en: [
    { left: 'Innovation', right: 'Stability', value: 30 },
    {
      left: 'Participative Decision Making',
      right: 'Top-down Decision Making',
      value: -20,
    },
    { left: 'Flexibility', right: 'Structure', value: 10 },
    { left: 'Individualism', right: 'Collectivism', value: -15 },
    {
      left: 'Collaborative Environment',
      right: 'Individual-focused Environment',
      value: 25,
    },
    { left: 'Open Communication', right: 'Formal Communication', value: 40 },
    {
      left: 'Performance-based Rewards',
      right: 'Equal Distribution Rewards',
      value: 5,
    },
    { left: 'Learning Oriented', right: 'Status Quo', value: 35 },
    { left: 'Customer Centric', right: 'Internal Process Centric', value: 45 },
    { left: 'Work Centric', right: 'Life Centric', value: -10 },
  ],
  ko: [
    { left: '혁신', right: '안정성', value: 30 },
    { left: '참여적 의사결정', right: '하향식 의사결정', value: -20 },
    { left: '유연성', right: '구조화', value: 10 },
    { left: '개인주의', right: '집단주의', value: -15 },
    { left: '협력적 환경', right: '개인 중심 환경', value: 25 },
    { left: '개방적 소통', right: '공식적 소통', value: 40 },
    { left: '성과 중심 보상', right: '평등 분배 ���상', value: 5 },
    { left: '학습 지향', right: '현상 유지', value: 35 },
    { left: '고객 중심', right: '내부 프로세스 중심', value: 45 },
    { left: '일 중심', right: '삶 중심', value: -10 },
  ],
};

const industryAverage = {
  collaborationIndex: 70,
  innovationIndex: 65,
  customerFocusIndex: 75,
  adaptabilityIndex: 68,
  leadershipEffectiveness: 72,
  employeeEngagement: 73,
  learningCulture: 71,
  decisionMakingEfficiency: 69,
};

const trendData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 70 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 75 },
];

export default function CultureProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(sampleProfile);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const router = useRouter();
  const { language } = useLanguage();

  const symmetricBarData = cultureDimensions[language].map((dimension) => ({
    name: dimension.left + ' vs ' + dimension.right,
    value: dimension.value,
  }));

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

  const handleNavigateToHiring = () => {
    router.push('/hiring');
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

  const renderTopCard = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-white opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-white opacity-20 animate-pulse"></div>
      </div>
      <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
        {content[language].title}
      </h1>
      <p className="text-white text-lg leading-relaxed mb-4">
        {content[language].description}
      </p>
      <div className="bg-white/20 rounded-full px-4 py-2 inline-flex items-center">
        <InformationCircleIcon className="h-5 w-5 mr-2 text-white" />
        <span className="text-white text-sm">
          {content[language].lastUpdated}:{' '}
          {lastUpdated?.toLocaleDateString(
            language === 'en' ? 'en-US' : 'ko-KR'
          )}
        </span>
      </div>
    </motion.div>
  );

  const renderCultureSummary = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
        <ChartPieIcon className="h-8 w-8 mr-3 text-indigo-600" />
        {content[language].cultureSummary}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <p className="text-gray-600 leading-relaxed mb-4">
            {content[language].cultureSummaryText}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {content[language].cultureTags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-6 flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">
            {content[language].overallCultureScore}
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            {content[language].overallCultureScoreDescription}
          </p>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-indigo-600 progress-ring__circle stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="50.24"
                transform="rotate(-90 50 50)"
              ></circle>
              <text
                x="50"
                y="50"
                fontFamily="Verdana"
                fontSize="20"
                textAnchor="middle"
                alignmentBaseline="central"
                fill="#4F46E5"
              >
                80%
              </text>
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {content[language].overallCultureScoreInterpretation}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderStrengthsAndWeaknesses = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <SparklesIcon className="h-7 w-7 mr-3 text-indigo-600" />
        {content[language].strengthsAndWeaknesses}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <ArrowUpIcon className="h-5 w-5 mr-2" />
            {content[language].strengths}
          </h3>
          <ul className="space-y-4">
            {[
              { key: 'customerFocusIndex', value: 82 },
              { key: 'learningCulture', value: 80 },
              { key: 'employeeEngagement', value: 78 },
            ].map((item) => (
              <li key={item.key} className="flex items-center justify-between">
                <span className="text-green-600 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  {
                    content[language][
                      item.key as keyof typeof content.en
                    ] as React.ReactNode
                  }
                </span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-green-700">
                    {item.value}%
                  </span>
                  <div className="ml-2 w-20 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
            <ArrowDownIcon className="h-5 w-5 mr-2" />
            {content[language].weaknesses}
          </h3>
          <ul className="space-y-4">
            {[
              { key: 'decisionMakingEfficiency', value: 65 },
              { key: 'innovationIndex', value: 68 },
              { key: 'adaptabilityIndex', value: 70 },
            ].map((item) => (
              <li key={item.key} className="flex items-center justify-between">
                <span className="text-red-600 flex items-center">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                  {
                    content[language][
                      item.key as keyof typeof content.en
                    ] as React.ReactNode
                  }
                </span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-red-700">
                    {item.value}%
                  </span>
                  <div className="ml-2 w-20 h-2 bg-red-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
        <p className="text-indigo-800 text-sm">
          {content[language].strengthsWeaknessesDescription}
        </p>
      </div>
    </motion.div>
  );

  const renderCultureProfileOverview = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 mb-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <ChartPieIcon className="h-7 w-7 mr-3 text-indigo-600" />
        {content[language].cultureProfileOverview}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#4a5568', fontSize: 12 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar
                name="Culture Profile"
                dataKey="A"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f7fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">
              {content[language].overviewExplanation}
            </h3>
            <p className="text-gray-600 mb-6">
              {content[language].overviewDescription}
            </p>
            <ul className="space-y-2">
              {radarData.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {item.subject as React.ReactNode}
                  </span>
                  <span className="font-semibold text-indigo-600">
                    {item.A as number}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleNavigateToHiring}
            className="mt-8 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            {content[language].findCandidates}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSymmetricBarChart = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h3 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <ChartBarIcon className="h-7 w-7 mr-3 text-indigo-600" />
        {content[language].cultureDimensions}
      </h3>
      <p className="text-gray-600 mb-8">
        {content[language].cultureDimensionsDescription}
      </p>
      <div className="space-y-8">
        {cultureDimensions[language].map((dimension, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-indigo-700 w-1/3 text-left">
                {dimension.left}
              </span>
              <span className="text-sm font-medium text-indigo-700 w-1/3 text-right">
                {dimension.right}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-full h-3 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full relative">
                {/* 중앙 값 표시 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-400"></div>
                <div
                  className="absolute h-5 w-5 bg-white border-4 border-indigo-600 rounded-full top-1/2 transform -translate-y-1/2 shadow-lg transition-all duration-300 hover:scale-110"
                  style={{ left: `${50 + dimension.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
        <p className="text-indigo-800 text-sm leading-relaxed">
          {content[language].cultureDimensionsInterpretation}
        </p>
      </div>
    </motion.div>
  );

  const renderIndustryComparison = () => {
    const comparisonData = Object.entries(profile)
      .map(([key, value]) => ({
        dimension: content[language][key as keyof typeof content.en],
        difference:
          (value as number) -
          industryAverage[key as keyof typeof industryAverage],
        company: value as number,
        industry: industryAverage[key as keyof typeof industryAverage],
      }))
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
          <ChartBarIcon className="h-7 w-7 mr-3 text-indigo-600" />
          {content[language].industryComparison}
        </h3>
        <p className="text-gray-600 mb-8">
          {content[language].industryComparisonDescription}
        </p>
        <div className="mb-12">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              layout="vertical"
              data={comparisonData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" domain={[-30, 30]} />
              <YAxis dataKey="dimension" type="category" width={150} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-4 rounded-lg shadow-lg border border-indigo-100">
                        <p className="font-bold text-indigo-800">
                          {data.dimension}
                        </p>
                        <p className="text-sm text-gray-600">
                          {content[language].yourCompany}:{' '}
                          <span className="font-semibold text-indigo-600">
                            {data.company}%
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          {content[language].industryAverage}:{' '}
                          <span className="font-semibold text-orange-500">
                            {data.industry}%
                          </span>
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          {content[language].difference}:{' '}
                          <span
                            className={
                              data.difference >= 0
                                ? 'text-green-500'
                                : 'text-red-500'
                            }
                          >
                            {data.difference > 0 ? '+' : ''}
                            {data.difference.toFixed(1)}%
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <ReferenceLine x={0} stroke="#000" />
              <Bar
                dataKey="difference"
                name={content[language].comparisonWithIndustry}
              >
                {comparisonData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.difference >= 0 ? '#4C51BF' : '#E53E3E'}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-6 shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-indigo-800">
              {content[language].keyInsights}
            </h4>
            <ul className="space-y-4">
              {comparisonData.slice(0, 3).map((item, index) => (
                <li
                  key={index}
                  className="flex items-start bg-white bg-opacity-50 rounded-xl p-4 shadow-sm"
                >
                  {item.difference > 0 ? (
                    <ArrowUpIcon className="h-6 w-6 mr-3 text-green-500 flex-shrink-0" />
                  ) : (
                    <ArrowDownIcon className="h-6 w-6 mr-3 text-red-500 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-gray-800 font-medium block mb-1">
                      {content[language].comparisonInsight(
                        item.dimension as string,
                        Math.abs(item.difference),
                        item.difference > 0
                      )}
                    </span>
                    <span className="text-sm text-gray-600">
                      {content[language].insightExplanation(
                        item.dimension as string,
                        item.difference
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-purple-800">
              {content[language].strategicRecommendations}
            </h4>
            <ul className="space-y-4">
              {content[language].industryComparisonRecommendations.map(
                (recommendation, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-white bg-opacity-50 rounded-xl p-4 shadow-sm"
                  >
                    <LightBulbIcon className="h-6 w-6 mr-3 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-800">{recommendation}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderTrendAnalysis = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <ArrowTrendingUpIcon className="h-7 w-7 mr-3 text-indigo-600" />
        {content[language].trendAnalysis}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fill: '#4a5568', fontSize: 12 }} />
          <YAxis tick={{ fill: '#4a5568', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f7fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-gray-600">
        {content[language].trendAnalysisText}
      </p>
    </motion.div>
  );

  const renderImprovementSuggestions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <LightBulbIcon className="h-7 w-7 mr-3 text-indigo-600" />
        {content[language].improvementSuggestions}
      </h2>
      <ul className="space-y-2">
        {content[language].improvementSuggestionsText
          .split('\n')
          .map((suggestion, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
              {suggestion}
            </li>
          ))}
      </ul>
    </motion.div>
  );

  const renderCultureType = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <ChartBarIcon className="h-7 w-7 mr-3 text-indigo-600" />
        {content[language].cultureType}
      </h2>
      <p className="text-gray-600 mb-6">{content[language].cultureTypeText}</p>
      <ul className="space-y-2">
        <li className="flex items-center text-gray-600">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          {content[language].innovationDriven}
        </li>
        <li className="flex items-center text-gray-600">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          {content[language].collaborationCentric}
        </li>
        <li className="flex items-center text-gray-600">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          {content[language].customerCentric}
        </li>
        <li className="flex items-center text-gray-600">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          {content[language].learningOriented}
        </li>
      </ul>
    </motion.div>
  );

  const renderProfileCards = () =>
    Object.entries(profile).map(([key, value], index) => (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300"
      >
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">
          {content[language][key as keyof typeof content.en] as React.ReactNode}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-4xl font-bold text-purple-600">
            {value as number}%
          </p>
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <ChartPieIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
          {
            profileDescriptions[language][
              key as keyof typeof profileDescriptions.en
            ]
          }
        </p>
      </motion.div>
    ));

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
        {renderTopCard()}
        {renderCultureSummary()}
        {renderStrengthsAndWeaknesses()}
        {renderCultureProfileOverview()}
        {renderSymmetricBarChart()}
        {renderIndustryComparison()}
        {renderTrendAnalysis()}
        {renderImprovementSuggestions()}
        {renderCultureType()}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderProfileCards()}
        </div>
      </div>
    </DashboardLayout>
  );
}
