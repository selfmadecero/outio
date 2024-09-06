'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { auth, db } from '../../../firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../../components/DashboardLayout';

interface Template {
  id: string;
  name: string;
  description: string;
  questions: string[];
}

export default function CreateSurvey() {
  const [user, setUser] = useState<User | null>(null);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { language } = useLanguage();
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchCompanyProfile(user.uid);
        fetchSurveyTemplates();
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchCompanyProfile = async (userId: string) => {
    try {
      const docRef = doc(db, 'companies', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCompanyProfile(docSnap.data());
        generateInitialQuestions(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSurveyTemplates = async () => {
    const templatesRef = collection(db, 'surveyTemplates');
    const templatesSnapshot = await getDocs(templatesRef);
    const templatesList = templatesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Template[];
    setTemplates(templatesList);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const selectedTemplateData = templates.find(
      (template) => template.id === templateId
    );
    if (selectedTemplateData) {
      setQuestions(selectedTemplateData.questions);
    }
  };

  const generateInitialQuestions = (profile: any) => {
    // 여기에서 회사 프로필을 기반으로 초기 질문을 생성합니다.
    // 실제 구현에서는 더 복잡한 로직이 필요할 수 있습니다.
    const initialQuestions = [
      `How would you describe the decision-making process in ${profile.name}?`,
      `What aspects of ${profile.name}'s culture do you appreciate the most?`,
      `How does ${profile.name} approach innovation and new ideas?`,
      'Describe the communication style within your team.',
      'How does the company handle work-life balance?',
    ];
    setQuestions(initialQuestions);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, newQuestion]);
      setNewQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await setDoc(doc(db, 'surveys', user.uid), {
        questions,
        createdAt: new Date(),
        companyId: user.uid,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating survey:', error);
      // 더 자세한 오류 정보 표시
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
      addQuestion: 'Add Question',
      placeholder: 'Enter a new question',
      submit: 'Create Survey',
    },
    ko: {
      title: '새 설문 만들기',
      selectTemplate: '템플릿 선택',
      addQuestion: '질문 추가',
      placeholder: '새 질문 입력',
      submit: '설문 생성',
    },
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content[language].title}
        </h2>
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                {content[language].selectTemplate}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'ring-2 ring-blue-500 transform scale-105'
                        : 'hover:shadow-xl'
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
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
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                {questions.map((question, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex mb-6">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder={content[language].placeholder}
                  className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                />
                <button
                  type="button"
                  onClick={addQuestion}
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {content[language].addQuestion}
                </button>
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
