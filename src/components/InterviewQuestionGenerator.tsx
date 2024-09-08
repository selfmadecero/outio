import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const InterviewQuestionGenerator: React.FC = () => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState('');

  const content = {
    en: {
      title: 'Interview Question Generator',
      generate: 'Generate Questions',
      jobTitle: 'Job Title',
      jobTitlePlaceholder: 'Enter job title',
      generatedQuestions: 'Generated Questions',
    },
    ko: {
      title: '면접 질문 생성기',
      generate: '질문 생성',
      jobTitle: '직무',
      jobTitlePlaceholder: '직무를 입력하세요',
      generatedQuestions: '생성된 질문',
    },
  };

  const generateQuestions = () => {
    // 실제 구현에서는 AI 모델이나 알고리즘을 사용하여 질문을 생성합니다.
    // 여기서는 예시로 직무에 따라 다른 질문을 생성합니다.
    const questions = [
      `${jobTitle} 분야에서의 귀하의 경험에 대해 말씀해주세요.`,
      `${jobTitle} 역할에서 가장 중요한 기술은 무엇이라고 생각하시나요?`,
      `${jobTitle}로서 직면할 수 있는 가장 큰 도전은 무엇이라고 생각하십니까?`,
      '팀 프로젝트에서 의견 충돌이 있었던 경험과 그것을 어떻게 해결했는지 말씀해주세요.',
      '새로운 기술이나 프로세스를 배우고 적용해야 했던 상황에서 어떻게 대처하셨나요?',
    ];
    setGeneratedQuestions(questions);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{content[language].title}</h2>
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block mb-2">
          {content[language].jobTitle}
        </label>
        <input
          type="text"
          id="jobTitle"
          className="w-full p-2 border rounded"
          placeholder={content[language].jobTitlePlaceholder}
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <button
        onClick={generateQuestions}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {content[language].generate}
      </button>
      {generatedQuestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            {content[language].generatedQuestions}
          </h3>
          <ul className="list-disc list-inside">
            {generatedQuestions.map((question, index) => (
              <li key={index} className="mb-2">
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionGenerator;
