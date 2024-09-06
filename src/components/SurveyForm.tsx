import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

interface Question {
  id: string;
  text: string;
  category: string;
  factorA: string;
  factorB: string;
}

export default function SurveyForm({ templateId, userId }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchSurveyTemplate(templateId);
  }, [templateId]);

  const fetchSurveyTemplate = async (templateId: string) => {
    const docRef = doc(db, 'surveyTemplates', templateId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setQuestions(docSnap.data().questions);
    }
  };

  const handleChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const surveyResult = {
        userId,
        templateId,
        answers,
        timestamp: new Date(),
      };
      await addDoc(collection(db, 'surveyResults'), surveyResult);
      analyzeSurveyResult(surveyResult);
      alert('설문이 제출되었습니다.');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('설문 제출 중 오류가 발생했습니다.');
    }
  };

  const analyzeSurveyResult = (result) => {
    // 여기에 설문 결과 분석 로직을 구현합니다.
    // 예: 각 카테고리별 점수 계산, 문화 프로필 생성 등
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <p>{question.text}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={answers[question.id] || 3}
            onChange={(e) =>
              handleChange(question.id, parseInt(e.target.value))
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span>{question.factorA}</span>
            <span>중간</span>
            <span>{question.factorB}</span>
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        제출
      </button>
    </form>
  );
}
