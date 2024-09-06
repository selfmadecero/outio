'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { auth, db } from '../../../firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../../components/DashboardLayout';

interface Question {
  Number: number;
  Question: string;
  'Answer A': string;
  'Answer B': string;
  Category: string;
  'Factor A': string;
  'Factor B': string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

const questionCounts = [30, 60, 90, 150];

export default function CreateSurvey() {
  const [user, setUser] = useState<User | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<
    number | null
  >(null);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchSurveyTemplates();
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchSurveyTemplates = async () => {
    const templatesRef = collection(db, 'surveyTemplates');
    const templatesSnapshot = await getDocs(templatesRef);
    const templatesList = templatesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Template[];
    setTemplates(templatesList);
    setIsLoading(false);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  const handleQuestionCountSelect = (count: number) => {
    setSelectedQuestionCount(count);
    if (selectedTemplate) {
      const shuffled = [...selectedTemplate.questions].sort(
        () => 0.5 - Math.random()
      );
      setRandomQuestions(shuffled.slice(0, count));
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedTemplate || !selectedQuestionCount) return;

    try {
      await setDoc(doc(db, 'surveys', user.uid), {
        templateId: selectedTemplate.id,
        questionCount: selectedQuestionCount,
        questions: randomQuestions,
        createdAt: new Date(),
        companyId: user.uid,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating survey:', error);
      if (error instanceof Error) {
        alert(`설문 생성 중 오류 발생: ${error.message}`);
      } else {
        alert('알 수 없는 오류가 발생했습니다');
      }
    }
  };

  const content = {
    en: {
      title: 'Create New Survey',
      selectTemplate: 'Select a Template',
      selectQuestionCount: 'Select Number of Questions',
      reviewQuestions: 'Review Selected Questions',
      submit: 'Create Survey',
      question: 'Question',
      answerA: 'Answer A',
      answerB: 'Answer B',
    },
    ko: {
      title: '새 설문 만들기',
      selectTemplate: '템플릿 선택',
      selectQuestionCount: '질문 개수 선택',
      reviewQuestions: '선택된 질문 검토',
      submit: '설문 생성',
      question: '질문',
      answerA: 'A 답변',
      answerB: 'B 답변',
    },
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content[language].title}
        </h2>
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  {content[language].selectTemplate}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <h4 className="text-lg font-semibold mb-2">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {template.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {template.questions.length} questions
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  {content[language].selectQuestionCount}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {questionCounts.map((count) => (
                    <button
                      key={count}
                      className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl"
                      onClick={() => handleQuestionCountSelect(count)}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  {content[language].reviewQuestions}
                </h3>
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                  {randomQuestions.map((question, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-800 mb-2">
                        {content[language].question}: {question.Question}
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        {content[language].answerA}: {question['Answer A']}
                      </p>
                      <p className="text-sm text-gray-700">
                        {content[language].answerB}: {question['Answer B']}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {content[language].submit}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
