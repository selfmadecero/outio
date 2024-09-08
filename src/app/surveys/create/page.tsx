'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import SurveyDeploymentPopup from '../../../components/SurveyDeploymentPopup';

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
        ko: '직원들은 회사의 가치와 목표에 동의하십니까?',
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

export default function CreateSurvey() {
  const { language } = useLanguage();
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
  const [recipients, setRecipients] = useState<string[]>([]);

  const content = {
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
      selectDepartments: 'Select Departments',
      departments: {
        hr: 'Human Resources',
        it: 'IT',
        marketing: 'Marketing',
        sales: 'Sales',
        finance: 'Finance',
      },
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
      removeQuestion: '문항 제거',
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
      selectDepartments: '부서 선택',
      departments: {
        hr: '인사팀',
        it: 'IT팀',
        marketing: '마케팅팀',
        sales: '영업팀',
        finance: '재무팀',
      },
    },
  };

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
      recipients,
    });
    // 여기에 설문조사 발송 로직 추가
    setIsDeploymentPopupOpen(false);
  };

  const handleRecipientsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRecipients(selectedOptions);
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content[language].surveyType}
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setSurveyType('one-time')}
                    className={`px-4 py-2 rounded-md ${
                      surveyType === 'one-time'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {content[language].oneTime}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSurveyType('pulse')}
                    className={`px-4 py-2 rounded-md ${
                      surveyType === 'pulse'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {content[language].pulse}
                  </button>
                </div>
              </div>

              {surveyType === 'pulse' && (
                <>
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
                      <option value="weekly">{content[language].weekly}</option>
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
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      min="1"
                      max="52"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content[language].recipients}
                </label>
                <select
                  multiple
                  value={recipients}
                  onChange={handleRecipientsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                >
                  <option value="all">{content[language].allEmployees}</option>
                  <optgroup label={content[language].selectDepartments}>
                    {Object.entries(content[language].departments).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )
                    )}
                  </optgroup>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
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
            </form>
          )}
        </motion.div>

        <SurveyDeploymentPopup
          isOpen={isDeploymentPopupOpen}
          onClose={() => setIsDeploymentPopupOpen(false)}
          onDeploy={handleDeploymentConfirm}
          language={language as 'en' | 'ko'}
        />
      </div>
    </DashboardLayout>
  );
}
