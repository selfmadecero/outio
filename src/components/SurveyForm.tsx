import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../contexts/LanguageContext';

interface Question {
  Number?: number;
  번호?: number;
  Question?: string;
  질문?: string;
  'Answer A'?: string;
  'A 답변'?: string;
  'Answer B'?: string;
  'B 답변'?: string;
  Category?: string;
  카테고리?: string;
  'Factor A'?: string;
  'A 팩터'?: string;
  'Factor B'?: string;
  'B 팩터'?: string;
}

interface SurveyFormProps {
  templateId: string;
  userId: string;
}

export default function SurveyForm({ templateId, userId }: SurveyFormProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const { language } = useLanguage();

  useEffect(() => {
    const fetchSurveyTemplate = async () => {
      const docRef = doc(db, 'surveyTemplates', templateId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()); // 로그 추가
        setQuestions(docSnap.data().questions);
      } else {
        console.log('No such document!');
      }
    };

    fetchSurveyTemplate();
  }, [templateId]);

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
      alert('설문이 제출되었습니다.');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('설문 제출 중 오류가 발생했습니다.');
    }
  };

  const getQuestionText = (question: Question) => {
    return language === 'ko' ? question.질문 : question.Question;
  };

  const getAnswerA = (question: Question) => {
    return language === 'ko' ? question['A 답변'] : question['Answer A'];
  };

  const getAnswerB = (question: Question) => {
    return language === 'ko' ? question['B 답변'] : question['Answer B'];
  };

  const getQuestionId = (question: Question) => {
    return (question.Number || question.번호)?.toString() || '';
  };

  if (questions.length === 0) {
    return (
      <div>
        Loading questions... If this persists, there might be an issue with the
        data.
      </div>
    );
  }

  console.log('Questions:', questions); // 로그 추가

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {questions.map((question) => (
        <div key={getQuestionId(question)} className="space-y-2">
          <p>{getQuestionText(question) || 'Question text not available'}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={answers[getQuestionId(question)] || 3}
            onChange={(e) =>
              handleChange(getQuestionId(question), parseInt(e.target.value))
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span>{getAnswerA(question) || 'Answer A not available'}</span>
            <span>중간</span>
            <span>{getAnswerB(question) || 'Answer B not available'}</span>
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
