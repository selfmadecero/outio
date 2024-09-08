'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import {
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import SurveyDeploymentPopup from '../../../components/SurveyDeploymentPopup';
import RecipientSelector from '../../../components/RecipientSelector';
import { useRouter } from 'next/navigation';

interface SurveyTemplate {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  questions: {
    ko: string;
    en: string;
  }[];
}

const surveyTemplates: SurveyTemplate[] = [
  {
    id: 'custom',
    title: {
      ko: '직접 만들기',
      en: 'Create Custom',
    },
    description: {
      ko: '처음부터 새로운 설문조사를 만듭니다.',
      en: 'Create a new survey from scratch.',
    },
    questions: [],
  },
  {
    id: 'organizational-culture',
    title: {
      ko: '조직 문화 설문조사',
      en: 'Organizational Culture Survey',
    },
    description: {
      ko: '회사의 현재 문화를 평가하고 개선점을 파악하기 위한 설문조사입니다.',
      en: 'A survey to assess the current company culture and identify areas for improvement.',
    },
    questions: [
      {
        ko: '우리 회사의 가치관이 명확하게 전달되고 있다고 생각하십니까?',
        en: "Do you think our company's values are clearly communicated?",
      },
      {
        ko: '팀 간 협업이 원활하게 이루어지고 있다고 느끼십니까?',
        en: 'Do you feel that collaboration between teams is smooth?',
      },
      {
        ko: '회사의 의사결정 과정이 투명하다고 생각하십니까?',
        en: "Do you think the company's decision-making process is transparent?",
      },
    ],
  },
  {
    id: 'employee-satisfaction',
    title: {
      ko: '직원 만족도 조사',
      en: 'Employee Satisfaction Survey',
    },
    description: {
      ko: '직원들의 전반적인 만족도와 업무 환경에 대한 의견을 수집합니다.',
      en: 'Gather feedback on overall employee satisfaction and work environment.',
    },
    questions: [
      {
        ko: '직원들은 회사의 가치와 목표에 동의하니까?',
        en: "Do employees agree with the company's values and goals?",
      },
      {
        ko: '직원들은 회사의 리더십에 만족하십니까?',
        en: "Are employees satisfied with the company's leadership?",
      },
      {
        ko: '직원들은 회사의 업무 환경에 만족하십니까?',
        en: "Are employees satisfied with the company's work environment?",
      },
    ],
  },
  {
    id: 'onboarding-feedback',
    title: {
      ko: '신입 사원 온보딩 피드백',
      en: 'New Employee Onboarding Feedback',
    },
    description: {
      ko: '신입 사원들의 온보딩 경험을 평가하고 개선점을 파악합니다.',
      en: 'Evaluate the onboarding experience of new employees and identify areas for improvement.',
    },
    questions: [
      {
        ko: '신입 사원들은 온보딩 프로그램이 유용하다고 느끼십니까?',
        en: 'Do new employees find the onboarding program useful?',
      },
      {
        ko: '신입 사원들은 회사의 문화에 빠르게 적응하고 있습니까?',
        en: "Are new employees quickly adapting to the company's culture?",
      },
      {
        ko: '신입 사원들은 필요한 지식과 기술을 습득하고 있습니까?',
        en: 'Are new employees acquiring the necessary knowledge and skills?',
      },
    ],
  },
  {
    id: 'work-life-balance',
    title: {
      ko: '일과 삶의 균형 평가',
      en: 'Work-Life Balance Assessment',
    },
    description: {
      ko: '직원들의 일과 삶의 균형 상태를 평가하고 개선 방안을 모색합니다.',
      en: 'Assess the work-life balance of employees and explore ways to improve it.',
    },
    questions: [
      {
        ko: '직원들은 업무와 개인 생활 사이의 균형을 유지하고 있습니까?',
        en: 'Do employees maintain a balance between work and personal life?',
      },
      {
        ko: '직원들은 야근이 자주 발생하는 것에 불만이 있습니까?',
        en: 'Are employees dissatisfied with frequent overtime?',
      },
      {
        ko: '직원들은 업무 외 활동에 충분한 시간을 할애하고 있습니까?',
        en: 'Do employees have enough time for non-work activities?',
      },
    ],
  },
  {
    id: 'remote-work',
    title: {
      ko: '원격 근무 효율성 조사',
      en: 'Remote Work Efficiency Survey',
    },
    description: {
      ko: '원격 근무 환경에서의 업무 효율성과 만족도를 평가합니다.',
      en: 'Evaluate work efficiency and satisfaction in a remote work environment.',
    },
    questions: [
      {
        ko: '원격 근무 환경에서 업무 생산성이 유지되고 있습니까?',
        en: 'Is productivity maintained in the remote work environment?',
      },
      {
        ko: '원격 근무 시 커뮤니케이션 문제가 발생하고 있습니까?',
        en: 'Are there communication issues in the remote work environment?',
      },
      {
        ko: '원격 근무 시 업무 환경에 만족하십니까?',
        en: 'Are you satisfied with the work environment in the remote work setup?',
      },
    ],
  },
];

interface Department {
  id: string;
  name: {
    en: string;
    ko: string;
  };
  employees: number;
}

const departments: Department[] = [
  {
    id: 'all',
    name: { en: 'All Employees', ko: '전체 임직원' },
    employees: 225, // 모든 부서의 직원 수 합계
  },
  { id: 'hr', name: { en: 'Human Resources', ko: '인사팀' }, employees: 20 },
  { id: 'it', name: { en: 'IT', ko: 'IT팀' }, employees: 50 },
  { id: 'marketing', name: { en: 'Marketing', ko: '마케팅팀' }, employees: 30 },
  { id: 'sales', name: { en: 'Sales', ko: '영업팀' }, employees: 100 },
  { id: 'finance', name: { en: 'Finance', ko: '재무팀' }, employees: 25 },
];

// content 객체의 타입 정의를 수정
type ContentType = {
  [key in 'en' | 'ko']: {
    title: string;
    description: string;
    surveyTitle: string;
    surveyDescription: string;
    create: string;
    chooseTemplate: string;
    questions: string;
    addQuestion: string;
    removeQuestion: string;
    questionPlaceholder: string;
    next: string;
    surveyType: string;
    oneTime: string;
    pulse: string;
    frequency: string;
    daily: string;
    weekly: string;
    biweekly: string;
    monthly: string;
    duration: string;
    previous: string;
    recipients: string;
    allEmployees: string;
    selectRecipients: string;
    departmentsSelected: string;
    departments: {
      hr: string;
      it: string;
      marketing: string;
      sales: string;
      finance: string;
    };
    surveySettings: string;
    weeks: string;
    employees: string;
    selectedRecipients: string;
    search: string;
    selectAll: string;
    deselectAll: string;
    confirm: string;
    congratulations: string;
    surveyCreatedMessage: string;
    goToSurveys: string;
    goToParticipate: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Create New Survey',
    description:
      'Choose a template or create a custom survey to gather insights from your team.',
    surveyTitle: 'Survey Title',
    surveyDescription: 'Survey Description',
    create: 'Create Survey',
    chooseTemplate: 'Choose a Template',
    questions: 'Survey Questions',
    addQuestion: 'Add Question',
    removeQuestion: 'Remove Question',
    questionPlaceholder: 'Enter your question here',
    next: 'Next',
    surveyType: 'Survey Type',
    oneTime: 'One-time Survey',
    pulse: 'Pulse Survey',
    frequency: 'Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    biweekly: 'Bi-weekly',
    monthly: 'Monthly',
    duration: 'Duration (weeks)',
    previous: 'Previous',
    recipients: 'Recipients',
    allEmployees: 'All Employees',
    selectRecipients: 'Select Recipients',
    departmentsSelected: 'departments selected',
    departments: {
      hr: 'Human Resources',
      it: 'IT',
      marketing: 'Marketing',
      sales: 'Sales',
      finance: 'Finance',
    },
    surveySettings: 'Survey Settings',
    weeks: 'weeks',
    employees: 'employees',
    selectedRecipients: 'Selected Recipients',
    search: 'Search',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    confirm: 'Confirm',
    congratulations: 'Congratulations!',
    surveyCreatedMessage: 'Your survey has been created successfully.',
    goToSurveys: 'Go to Surveys',
    goToParticipate: 'Go to Participate',
  },
  ko: {
    title: '새 설문조사 만들기',
    description:
      '템플릿을 선택하거나 맞춤형 설문조사를 만들어 팀의 인사이트를 수집하세요.',
    surveyTitle: '설문조사 제목',
    surveyDescription: '설문조사 설명',
    create: '설문조사 생성',
    chooseTemplate: '템플릿 선택',
    questions: '설문 문항',
    addQuestion: '문항 추가',
    removeQuestion: '문항 제',
    questionPlaceholder: '질문을 입력하세요',
    next: '다음',
    surveyType: '설문조사 유형',
    oneTime: '1회성 설문조사',
    pulse: '펄스 서베이',
    frequency: '빈도',
    daily: '매일',
    weekly: '매주',
    biweekly: '2주마다',
    monthly: '매월',
    duration: '기간 (주)',
    previous: '이전',
    recipients: '수신자',
    allEmployees: '전체 임직원',
    selectRecipients: '수신자 선택',
    departmentsSelected: '개 부서 선택됨',
    departments: {
      hr: '인사팀',
      it: 'IT팀',
      marketing: '마케팅팀',
      sales: '영업팀',
      finance: '재무팀',
    },
    surveySettings: '설문조사 설정',
    weeks: '주',
    employees: '명',
    selectedRecipients: '선택된 수신자',
    search: '검색',
    selectAll: '전체 선택',
    deselectAll: '전체 해제',
    confirm: '확인',
    congratulations: '축하합니다!',
    surveyCreatedMessage: '설문조사가 성공적으로 생성되었습니다.',
    goToSurveys: '설문조사 페이지로 돌아가기',
    goToParticipate: '설문조사 하러가기',
  },
};

export default function CreateSurvey() {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [selectedTemplate, setSelectedTemplate] = useState<string>('custom');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [surveyType, setSurveyType] = useState<'one-time' | 'pulse'>(
    'one-time'
  );
  const [frequency, setFrequency] = useState('weekly');
  const [duration, setDuration] = useState(4);
  const [isDeploymentPopupOpen, setIsDeploymentPopupOpen] = useState(false);
  const [isRecipientSelectorOpen, setIsRecipientSelectorOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([
    'all',
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = surveyTemplates.find((t) => t.id === templateId);
    if (template) {
      if (templateId === 'custom') {
        setTitle('');
        setDescription('');
        setQuestions([]);
      } else {
        setTitle(template.title[language as 'ko' | 'en']);
        setDescription(template.description[language as 'ko' | 'en']);
        setQuestions(template.questions.map((q) => q[language as 'ko' | 'en']));
      }
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploymentPopupOpen(true);
  };

  const handleDeploymentConfirm = () => {
    console.log('Deploying survey:', {
      title,
      description,
      questions,
      surveyType,
      frequency,
      duration,
      recipients: selectedRecipients,
      isAnonymous: true,
    });
    // 여기에 설문조사 발송 로직 추가
    setIsDeploymentPopupOpen(false);
    setShowSuccessPopup(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // 5초 후 confetti 효과 종료
  };

  const handleGoToSurveys = () => {
    setShowSuccessPopup(false);
    router.push('/surveys');
  };

  const handleGoToParticipate = () => {
    setShowSuccessPopup(false);
    router.push('/surveys/participate');
  };

  const handleToggleDepartment = (departmentId: string) => {
    if (departmentId === 'all') {
      setSelectedRecipients(selectedRecipients.includes('all') ? [] : ['all']);
    } else {
      setSelectedRecipients((prev) => {
        if (prev.includes('all')) {
          return [departmentId];
        }
        if (prev.includes(departmentId)) {
          return prev.filter((id) => id !== departmentId);
        }
        return [...prev, departmentId];
      });
    }
  };

  const getSelectedDepartments = () => {
    if (selectedRecipients.includes('all')) {
      return departments;
    }
    return departments.filter((dept) => selectedRecipients.includes(dept.id));
  };

  const handleRemoveRecipient = (deptId: string) => {
    setSelectedRecipients((prev) => prev.filter((id) => id !== deptId));
  };

  const getTotalSelectedEmployees = () => {
    if (selectedRecipients.includes('all')) {
      return departments.find((dept) => dept.id === 'all')?.employees || 0;
    }
    return departments
      .filter(
        (dept) => selectedRecipients.includes(dept.id) && dept.id !== 'all'
      )
      .reduce((sum, dept) => sum + dept.employees, 0);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 '직접 만들기' 템플릿으로 초기화
    const customTemplate = surveyTemplates.find((t) => t.id === 'custom');
    if (customTemplate) {
      setTitle(customTemplate.title[language as 'ko' | 'en']);
      setDescription(customTemplate.description[language as 'ko' | 'en']);
      setQuestions(
        customTemplate.questions.map((q) => q[language as 'ko' | 'en'])
      );
    }
  }, [language]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 flex items-center">
            <ClipboardDocumentListIcon className="h-10 w-10 mr-4 text-indigo-600" />
            {content[language].title}
          </h1>
          <p className="text-gray-700 mb-6">{content[language].description}</p>

          {step === 1 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  {content[language].chooseTemplate}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {surveyTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <h3 className="text-lg font-medium mb-2 text-gray-800">
                        {template.title[language as 'ko' | 'en']}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {template.description[language as 'ko' | 'en']}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleNext} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {content[language].surveyTitle}
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {content[language].surveyDescription}
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {content[language].questions}
                  </h3>
                  {questions.map((question, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <input
                        type="text"
                        value={question}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        placeholder={content[language].questionPlaceholder}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    {content[language].addQuestion}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                >
                  {content[language].next}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {content[language].surveySettings}
                </h2>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {content[language].surveyType}
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setSurveyType('one-time')}
                      className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                        surveyType === 'one-time'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {content[language].oneTime}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSurveyType('pulse')}
                      className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                        surveyType === 'pulse'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {content[language].pulse}
                    </button>
                  </div>
                </div>

                {surveyType === 'pulse' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {content[language].frequency}
                      </label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                      >
                        <option value="daily">{content[language].daily}</option>
                        <option value="weekly">
                          {content[language].weekly}
                        </option>
                        <option value="biweekly">
                          {content[language].biweekly}
                        </option>
                        <option value="monthly">
                          {content[language].monthly}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {content[language].duration}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="52"
                          value={duration}
                          onChange={(e) =>
                            setDuration(parseInt(e.target.value))
                          }
                          className="w-full"
                        />
                        <span className="text-gray-700 font-medium">
                          {duration} {content[language].weeks}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].recipients}
                  </label>
                  <div className="space-y-2">
                    {departments.map((dept) => (
                      <div
                        key={dept.id}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleToggleDepartment(dept.id)}
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedRecipients.includes(dept.id) ||
                            selectedRecipients.includes('all')
                          }
                          onChange={() => {}}
                          className="mr-2"
                        />
                        <span className="flex-grow">
                          {dept.name[language as 'en' | 'ko']}
                        </span>
                        <span className="text-sm text-gray-500">
                          {dept.employees}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedRecipients.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-indigo-50 rounded-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-700">
                        {content[language].selectedRecipients}
                      </span>
                      <span className="text-sm font-bold text-indigo-700">
                        {getTotalSelectedEmployees()}{' '}
                        {content[language].employees}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedDepartments().map((dept) => (
                        <span
                          key={dept.id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {dept.name[language as 'en' | 'ko']}
                          {dept.id !== 'all' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // 이벤트 버블링 방지
                                handleRemoveRecipient(dept.id);
                              }}
                              className="ml-1 focus:outline-none"
                            >
                              <XCircleIcon className="h-4 w-4 text-indigo-600 hover:text-indigo-800" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
                >
                  {content[language].previous}
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                >
                  {content[language].create}
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>

        <SurveyDeploymentPopup
          isOpen={isDeploymentPopupOpen}
          onClose={() => setIsDeploymentPopupOpen(false)}
          onDeploy={handleDeploymentConfirm}
          language={language as 'en' | 'ko'}
        />

        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                {content[language].congratulations}
              </h2>
              <p className="text-gray-700 mb-6">
                {content[language].surveyCreatedMessage}
              </p>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleGoToSurveys}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  {content[language].goToSurveys}
                </button>
                <button
                  onClick={handleGoToParticipate}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  {content[language].goToParticipate}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
