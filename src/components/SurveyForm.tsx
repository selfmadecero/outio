import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const questions = [
  '우리 회사의 의사결정 과정은 효율적이다.',
  '나는 동료들과 원활하게 소통할 수 있다.',
  '우리 회사는 혁신을 장려한다.',
  '우리 팀은 협력적으로 일한다.',
];

export default function SurveyForm() {
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(3)
  );

  const handleChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'surveys'), {
        answers,
        timestamp: new Date(),
      });
      alert('설문이 제출되었습니다.');
      setAnswers(new Array(questions.length).fill(3));
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('설문 제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="space-y-2">
          <p>{question}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={answers[index]}
            onChange={(e) => handleChange(index, parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span>전혀 아니다</span>
            <span>보통이다</span>
            <span>매우 그렇다</span>
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
