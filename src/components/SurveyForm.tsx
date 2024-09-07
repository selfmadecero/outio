import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

interface Question {
  Number: number;
  Question: string;
  'Answer A': string;
  'Answer B': string;
  Category: string;
  'Factor A': string;
  'Factor B': string;
}

interface SurveyFormProps {
  templateId: string;
  userId: string;
}

export default function SurveyForm({ templateId, userId }: SurveyFormProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchSurveyTemplate = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'surveyTemplates', templateId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Document data:', data);
          if (Array.isArray(data.questions) && data.questions.length > 0) {
            setQuestions(data.questions);
          } else {
            setError('No questions found in the template');
          }
        } else {
          setError('No such document!');
        }
      } catch (err) {
        console.error('Error fetching survey template:', err);
        setError('Failed to load survey questions');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyTemplate();
  }, [templateId]);

  const handleChange = (questionId: number, value: number) => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-8">{error}</div>;
  }

  const content = {
    en: {
      title: 'Organization Culture Survey',
      submit: 'Submit Survey',
    },
    ko: {
      title: '조직 문화 설문조사',
      submit: '설문 제출',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
      >
        {content[language].title}
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <motion.div
            key={question.Number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {question.Question}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{question['Answer A']}</span>
                <span>{question['Answer B']}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={answers[question.Number] || 3}
                onChange={(e) =>
                  handleChange(question.Number, parseInt(e.target.value))
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{question['Factor A']}</span>
                <span>{question['Factor B']}</span>
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: questions.length * 0.1 }}
          className="text-center"
        >
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            {content[language].submit}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
