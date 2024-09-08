import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface CandidateDetailProps {
  candidateId: string;
}

interface InterviewQuestion {
  id: string;
  question: {
    en: string;
    ko: string;
  };
  cultureFitAspect: {
    en: string;
    ko: string;
  };
  scoringGuide: {
    excellent: {
      en: string;
      ko: string;
    };
    good: {
      en: string;
      ko: string;
    };
    average: {
      en: string;
      ko: string;
    };
    poor: {
      en: string;
      ko: string;
    };
  };
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({ candidateId }) => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [interviewScores, setInterviewScores] = useState<{
    [key: string]: number;
  }>({});
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestion[]
  >([]);
  const [cultureFitScore, setCultureFitScore] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);

  const content = {
    en: {
      title: 'Candidate Profile',
      name: 'Name',
      position: 'Position',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      cultureFitScore: 'Culture Fit Score',
      skillsMatch: 'Skills Match',
      overallRating: 'Overall Rating',
      cultureFitAnalysis: 'Culture Fit Analysis',
      interviewQuestions: 'Culture-Based Interview Questions',
      scoringGuide: 'Scoring Guide',
      excellentFit: 'Excellent Fit (9-10)',
      goodFit: 'Good Fit (7-8)',
      averageFit: 'Average Fit (4-6)',
      poorFit: 'Poor Fit (1-3)',
      saveScores: 'Save Scores',
      cultureFitAspect: 'Culture Fit Aspect',
      verticalStructure: 'Vertical Organizational Structure',
      topCultureFactors: 'Top 3 Culture Factors',
      recommendedQuestions:
        'Recommended questions based on our company culture:',
      email: 'Email',
      phone: 'Phone',
      currentCompany: 'Current Company',
      desiredSalary: 'Desired Salary',
      availability: 'Availability',
      resumeLink: 'Resume Link',
      portfolioLink: 'Portfolio Link',
      scoresSaved: 'Scores saved successfully!',
      close: 'Close',
    },
    ko: {
      title: '후보자 프로필',
      name: '이름',
      position: '직무',
      experience: '경력',
      skills: '기술',
      education: '학력',
      cultureFitScore: '문화 적합성 점수',
      skillsMatch: '기술 일치도',
      overallRating: '종합 평가',
      cultureFitAnalysis: '문화 적합성 분석',
      interviewQuestions: '문화 기반 면접 질문',
      scoringGuide: '채점 가이드',
      excellentFit: '탁월한 적합성 (9-10)',
      goodFit: '좋은 적합성 (7-8)',
      averageFit: '보통 적합성 (4-6)',
      poorFit: '낮은 적합성 (1-3)',
      saveScores: '점수 저장',
      cultureFitAspect: '문화 적합성 측면',
      verticalStructure: '수직적 조직 구조',
      topCultureFactors: '상위 3개 문화 요소',
      recommendedQuestions: '우리 회사 문화를 바탕으로 한 추천 질문:',
      email: '이메일',
      phone: '전화번호',
      currentCompany: '현재 회사',
      desiredSalary: '희망 연봉',
      availability: '입사 가능 시기',
      resumeLink: '이력서 링크',
      portfolioLink: '포트폴리오 링크',
      scoresSaved: '점수가 성공적으로 저장되었습니다!',
      close: '닫기',
    },
  };

  const candidateData = {
    name: {
      en: 'John Doe',
      ko: '홍길동',
    },
    position: {
      en: 'Software Engineer',
      ko: '소프트웨어 엔지니어',
    },
    experience: '5 years',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    education: {
      en: 'Seoul National University, Computer Science',
      ko: '서울대학교 컴퓨터공학과',
    },
    cultureFitScore: 85,
    skillsMatch: 90,
    overallRating: 88,
    email: 'john.doe@example.com',
    phone: '+82 10-1234-5678',
    currentCompany: {
      en: 'Tech Innovators Inc.',
      ko: '테크 이노베이터스',
    },
    desiredSalary: {
      en: '$80,000 - $100,000',
      ko: '8000만원 - 1억원',
    },
    availability: {
      en: 'Available in 2 weeks',
      ko: '2주 후 입사 가능',
    },
    resumeLink: 'https://example.com/johndoe_resume.pdf',
    portfolioLink: 'https://johndoe-portfolio.com',
  };

  useEffect(() => {
    setCompanyProfile({
      organizationStructure: 'vertical',
      topFactors: [
        { en: 'Vertical Structure', ko: '수직적 구조', score: 0 },
        { en: 'Innovation-driven', ko: '혁신 중심', score: 0 },
        { en: 'Result-oriented', ko: '결과 지향적', score: 0 },
      ],
    });

    generateInterviewQuestions();
  }, []);

  useEffect(() => {
    calculateCultureFitScore();
  }, [interviewScores]);

  const generateInterviewQuestions = () => {
    const questions: InterviewQuestion[] = [
      {
        id: '1',
        question: {
          en: "How do you handle situations where you disagree with your superior's instructions?",
          ko: '상사의 지시에 동의하지 않을 때 어떻게 대처하시나요?',
        },
        cultureFitAspect: {
          en: 'Vertical Organizational Structure',
          ko: '수직적 조직 구조',
        },
        scoringGuide: {
          excellent: {
            en: "Explains methods to respectfully present own opinions while acknowledging superior's authority",
            ko: '상사의 권위를 존중하면서도 자신의 의견을 건설적으로 제시하는 방법을 설명함',
          },
          good: {
            en: "Mentions following superior's opinion while carefully expressing own thoughts",
            ko: '상사의 의견을 따르되 자신의 생각도 조심스럽게 표현하는 방법을 언급함',
          },
          average: {
            en: "States either unconditional compliance or too strong opposition to superior's opinion",
            ko: '상사의 의견을 무조건 따른다고 하거나, 너무 강하게 반대 의견을 제시한다고 함',
          },
          poor: {
            en: "Indicates disregard for superior's authority or confrontational approach",
            ko: '상사의 권위를 무시하거나 갈등을 일으키는 방식으로 대응한다고 함',
          },
        },
      },
      {
        id: '2',
        question: {
          en: 'How do you handle disagreements with your superiors in decision-making processes?',
          ko: '상급자의 결정에 동의하지 않을 때, 어떻게 대처하시나요?',
        },
        cultureFitAspect: {
          en: 'Vertical Decision-Making Structure',
          ko: '수직적 의사결정 구조',
        },
        scoringGuide: {
          excellent: {
            en: "Explains respecting superior's authority while appropriately presenting own opinions, understanding the organization's hierarchy and providing constructive feedback",
            ko: '상급자의 권위를 존중하면서도 적절한 방식으로 자신의 의견을 제시하는 방법을 구체적으로 설명함. 조직의 위계질서를 이해하고 있으면서도 건설적인 피드백을 제공하는 능력을 보여줌.',
          },
          good: {
            en: "Mentions respecting superior's decision while carefully expressing own thoughts, acknowledging the hierarchy",
            ko: '상급자의 결정을 존중하면서 자신의 의견을 조심스럽게 표현하는 방법을 언급함. 위계질서를 인식하고 있지만, 의견 제시 방법이 다소 모호함.',
          },
          average: {
            en: "Recognizes the importance of following superior's decision but lacks a clear strategy for expressing own thoughts",
            ko: '상급자의 결정을 따르는 것의 중요성은 인식하고 있으나, 자신의 의견을 표현하는 방법에 대한 구체적인 전략이 부족함.',
          },
          poor: {
            en: "Unconditionally follows superior's decision or inappropriately opposes it, showing lack of understanding of vertical structure",
            ko: '상급자의 결정에 무조건 따르거나, 반대로 부적절한 방식으로 이의를 제기하는 등 수직적 구조에 대한 이해가 부족함을 보여줌.',
          },
        },
      },
      {
        id: '3',
        question: {
          en: 'Can you describe an experience where you participated in a significant decision-making process at your company? What was your role, and what did you learn from the experience?',
          ko: '회사의 중요한 의사결정 과정에 참여한 경험이 있다면 설명해주세요. 어떤 역할을 맡았고, 그 과정에서 어떤 점을 배웠나요?',
        },
        cultureFitAspect: {
          en: 'Participation in Vertical Decision-Making',
          ko: '수직적 조직에서의 의사결정 참여',
        },
        scoringGuide: {
          excellent: {
            en: 'Describes participating in a decision-making process in an appropriate way within the vertical organizational structure. Clearly understands own role and contributes valuable insights while respecting the authority of higher decision-makers',
            ko: '수직적 조직 구조 내에서 적절한 방식으로 의사결정에 참여한 구체적인 경험을 설명함. 자신의 역할을 명확히 이해하고 있으며, 상위 결정권자를 존중하면서도 가치 있는 기여를 한 방법을 상세히 설명함.',
          },
          good: {
            en: 'Mentions participating in a decision-making process and describes own role and what was learned. Understands the concept of vertical structure but lacks specific examples',
            ko: '의사결정 과정에 참여한 경험을 언급하고, 자신의 역할과 배운 점을 설명함. 수직적 구조에 대한 이해를 보여주지만, 구체적인 예시가 다소 부족함.',
          },
          average: {
            en: 'Has participated in a decision-making process but lacks understanding of appropriate participation within the vertical organizational structure. Mentions learning points but lacks specificity',
            ko: '의사결정 과정에 참여한 경험은 있으나, 수직적 조직 구조에서의 적절한 참여 방식에 대한 이해가 부족함. 배운 점을 언급하지만 구체성이 떨어짐.',
          },
          poor: {
            en: 'Either has no experience participating in a decision-making process or lacks understanding of vertical structure. Describes inappropriate participation methods or fails to mention learning points',
            ko: '의사결정 과정에 참여한 경험이 없거나, 수직적 조직 구조에 대한 이해가 전혀 없음. 부적절한 참여 방식을 언급하거나 배운 점을 제시하지 못함.',
          },
        },
      },
    ];
    setInterviewQuestions(questions);
  };

  const handleScoreChange = (questionId: string, score: number) => {
    setInterviewScores((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateCultureFitScore = () => {
    if (interviewQuestions.length === 0) return;

    const totalScore = Object.values(interviewScores).reduce(
      (sum, score) => sum + score,
      0
    );
    const maxPossibleScore = interviewQuestions.length * 10;
    const calculatedScore = (totalScore / maxPossibleScore) * 100;

    setCultureFitScore(Math.round(calculatedScore));

    const updatedTopFactors = companyProfile.topFactors.map(
      (factor: any, index: number) => ({
        ...factor,
        score: calculatedScore * (1 - index * 0.1),
      })
    );

    setCompanyProfile((prev: any) => ({
      ...prev,
      topFactors: updatedTopFactors,
    }));
  };

  const saveScores = () => {
    console.log('Saved scores:', interviewScores);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const cultureFitChartData = {
    labels:
      companyProfile?.topFactors.map((factor: any) => factor[language]) || [],
    datasets: [
      {
        label: content[language].cultureFitScore,
        data:
          companyProfile?.topFactors.map((factor: any) => factor.score) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {content[language].title}
      </h2>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ProfileItem
              label={content[language].name}
              value={candidateData.name[language]}
            />
            <ProfileItem
              label={content[language].position}
              value={candidateData.position[language]}
            />
            <ProfileItem
              label={content[language].experience}
              value={candidateData.experience}
            />
            <ProfileItem
              label={content[language].skills}
              value={candidateData.skills.join(', ')}
            />
            <ProfileItem
              label={content[language].education}
              value={candidateData.education[language]}
            />
          </div>
          <div className="space-y-4">
            <ProfileItem
              label={content[language].email}
              value={candidateData.email}
            />
            <ProfileItem
              label={content[language].phone}
              value={candidateData.phone}
            />
            <ProfileItem
              label={content[language].currentCompany}
              value={candidateData.currentCompany[language]}
            />
            <ProfileItem
              label={content[language].desiredSalary}
              value={candidateData.desiredSalary[language]}
            />
            <ProfileItem
              label={content[language].availability}
              value={candidateData.availability[language]}
            />
            <ProfileLink
              label={content[language].resumeLink}
              href={candidateData.resumeLink}
            />
            <ProfileLink
              label={content[language].portfolioLink}
              href={candidateData.portfolioLink}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {content[language].cultureFitAnalysis}
        </h3>
        <p className="text-gray-600 mb-4">
          {language === 'en'
            ? `This candidate aligns ${cultureFitScore}% with our company's culture.`
            : `이 후보자는 우리 회사의 문화와 ${cultureFitScore}% 일치합니다.`}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-2">
              {content[language].topCultureFactors}
            </h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              {companyProfile?.topFactors.map((factor: any, index: number) => (
                <li key={index} className="text-gray-700">
                  {factor[language]}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-64">
            <Radar data={cultureFitChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {content[language].interviewQuestions}
        </h3>
        {interviewQuestions.map((q) => (
          <div key={q.id} className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <p className="font-semibold mb-2 text-lg">{q.question[language]}</p>
            <p className="text-sm text-gray-600 mb-4">
              {content[language].cultureFitAspect}:{' '}
              <span className="font-medium">
                {q.cultureFitAspect[language]}
              </span>
            </p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-gray-700">
                {content[language].scoringGuide}
              </h4>
              <ScoringGuideItem
                label={content[language].excellentFit}
                guide={q.scoringGuide.excellent[language]}
              />
              <ScoringGuideItem
                label={content[language].goodFit}
                guide={q.scoringGuide.good[language]}
              />
              <ScoringGuideItem
                label={content[language].averageFit}
                guide={q.scoringGuide.average[language]}
              />
              <ScoringGuideItem
                label={content[language].poorFit}
                guide={q.scoringGuide.poor[language]}
              />
            </div>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <label key={score} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={score}
                    checked={interviewScores[q.id] === score}
                    onChange={() => handleScoreChange(q.id, score)}
                    className="mr-1 cursor-pointer"
                  />
                  <span className="text-sm">{score}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={saveScores}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
        >
          {content[language].saveScores}
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
          <div
            className={`
              max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto
              ring-1 ring-black ring-opacity-5 overflow-hidden
              transform transition-all duration-500 ease-in-out
              ${
                showPopup
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }
            `}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {content[language].scoresSaved}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {language === 'en'
                      ? 'The scores have been successfully saved.'
                      : '점수가 성공적으로 저장되었습니다.'}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setShowPopup(false)}
                  >
                    <span className="sr-only">{content[language].close}</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <span className="font-semibold text-gray-700">{label}: </span>
    <span className="text-gray-600">{value}</span>
  </div>
);

const ProfileLink: React.FC<{ label: string; href: string }> = ({
  label,
  href,
}) => (
  <div>
    <span className="font-semibold text-gray-700">{label}: </span>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {label}
    </a>
  </div>
);

const ScoringGuideItem: React.FC<{ label: string; guide: string }> = ({
  label,
  guide,
}) => (
  <div className="mb-2">
    <span className="font-semibold text-gray-700">{label}: </span>
    <span className="text-gray-600">{guide}</span>
  </div>
);

export default CandidateDetail;
