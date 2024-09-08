import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Question {
  id: string;
  text: string;
  scoringGuide: string;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
}

interface InterviewAssistantProps {
  candidateId: string;
}

const InterviewAssistant: React.FC<InterviewAssistantProps> = ({
  candidateId,
}) => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const content = {
    en: {
      title: 'Interview Assistant',
      candidateName: 'Candidate Name',
      position: 'Position',
      scoringGuide: 'Scoring Guide',
      score: 'Score',
      saveScores: 'Save Scores',
      exportCSV: 'Export to CSV',
    },
    ko: {
      title: '면접 도우미',
      candidateName: '지원자 이름',
      position: '포지션',
      scoringGuide: '채점 가이드',
      score: '점수',
      saveScores: '점수 저장',
      exportCSV: 'CSV로 내보내기',
    },
  };

  useEffect(() => {
    // 실제 구현에서는 API를 통해 후보자 정보를 가져옵니다.
    setCandidate({
      id: candidateId,
      name: '홍길동',
      position: '소프트웨어 엔지니어',
    });

    // 실제 구현에서는 API를 통해 질문을 가져옵니다.
    setQuestions([
      {
        id: '1',
        text: '소프트웨어 엔지니어로서의 경험에 대해 말씀해주세요.',
        scoringGuide: '경험의 관련성과 깊이에 따라 1-10점 부여',
      },
      {
        id: '2',
        text: '팀 프로젝트에서 의견 충돌이 있었던 경험과 그것을 어떻게 해결했는지 말씀해주세요.',
        scoringGuide: '갈등 해결 능력과 팀워크 스킬에 따라 1-10점 부여',
      },
      // 추가 질문들...
    ]);
  }, [candidateId]);

  const handleScoreChange = (questionId: string, score: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [questionId]: score,
    }));
  };

  const saveScores = () => {
    console.log('Saved scores:', scores);
    // 실제 구현에서는 여기서 점수를 서버에 저장합니다.
  };

  const exportToCSV = () => {
    // CSV 데이터 생성
    const csvContent = `Candidate,${candidate?.name}\nPosition,${
      candidate?.position
    }\n\nQuestion,Score\n${questions
      .map((q) => `"${q.text}",${scores[q.id] || ''}`)
      .join('\n')}`;

    // CSV 파일 다운로드
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `interview_${candidateId}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{content[language].title}</h2>
      <div className="mb-4">
        <p>
          <strong>{content[language].candidateName}:</strong> {candidate.name}
        </p>
        <p>
          <strong>{content[language].position}:</strong> {candidate.position}
        </p>
      </div>
      {questions.map((question) => (
        <div key={question.id} className="mb-6 border-b pb-4">
          <p className="font-semibold mb-2">{question.text}</p>
          <p className="text-sm text-gray-600 mb-2">
            {content[language].scoringGuide}: {question.scoringGuide}
          </p>
          <div className="flex items-center">
            <span className="mr-2">{content[language].score}:</span>
            <input
              type="number"
              min="1"
              max="10"
              className="p-1 border rounded w-16"
              value={scores[question.id] || ''}
              onChange={(e) =>
                handleScoreChange(question.id, parseInt(e.target.value))
              }
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          onClick={saveScores}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          {content[language].saveScores}
        </button>
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {content[language].exportCSV}
        </button>
      </div>
    </div>
  );
};

export default InterviewAssistant;
