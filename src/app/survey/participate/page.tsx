'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

export default function ParticipateSurvey() {
  const [survey, setSurvey] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchSurvey = async () => {
      // 실제 구현에서는 URL 파라미터나 다른 방법으로 설문 ID를 받아야 합니다.
      const surveyId = 'SURVEY_ID';
      const surveyRef = doc(db, 'surveys', surveyId);
      const surveySnap = await getDoc(surveyRef);
      if (surveySnap.exists()) {
        setSurvey(surveySnap.data());
        setAnswers(new Array(surveySnap.data().questions.length).fill(''));
      } else {
        // 설문이 존재하지 않을 경우 처리
        router.push('/');
      }
    };
    fetchSurvey();
  }, [router]);

  const content = {
    en: {
      title: 'Participate in Survey',
      submit: 'Submit Answers',
      success: 'Thank you for participating in the survey!',
    },
    ko: {
      title: '설문 참여',
      submit: '답변 제출',
      success: '설문에 참여해 주셔서 감사합니다!',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!survey) return;

    try {
      const surveyRef = doc(db, 'surveys', 'SURVEY_ID');
      await updateDoc(surveyRef, {
        responses: arrayUnion({
          answers,
          submittedAt: new Date(),
        }),
      });

      // 문화 프로필 업데이트
      const profileRef = doc(db, 'cultureProfiles', 'COMPANY_ID');
      const profileSnap = await getDoc(profileRef);
      const currentProfile = profileSnap.exists() ? profileSnap.data() : {};

      // 간단한 예시 로직 - 실제로는 더 복잡한 분석이 필요할 수 있습니다
      const newProfile = {
        decisionMaking: calculateScore(answers[0]),
        communication: calculateScore(answers[1]),
        innovation: calculateScore(answers[2]),
        workLifeBalance: calculateScore(answers[3]),
      };

      await setDoc(profileRef, newProfile, { merge: true });

      alert(content[language].success);
      router.push('/');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again.');
    }
  };

  // 간단한 점수 계산 함수 - 실제로는 더 복잡한 로직이 필요할 수 있습니다
  function calculateScore(answer: string): number {
    // 예: 답변의 길이를 기준으로 점수 계산 (0-100)
    return Math.min(Math.floor(answer.length * 5), 100);
  }

  if (!survey) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {content[language].title}
        </h2>
        <form onSubmit={handleSubmit}>
          {survey.questions.map((question: string, index: number) => (
            <div key={index} className="mb-6">
              <label
                htmlFor={`question-${index}`}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {question}
              </label>
              <textarea
                id={`question-${index}`}
                rows={3}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                required
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {content[language].submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
