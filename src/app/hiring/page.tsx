'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import HiringInsights from '../../components/HiringInsights';
import CandidateList from '../../components/CandidateList';
import InterviewAssistant from '../../components/InterviewAssistant';
import CultureFitAnalysis from '../../components/CultureFitAnalysis';

export default function Hiring() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title: 'Culture-Driven Hiring',
      subtitle:
        'Find candidates who truly fit your unique organizational culture',
      addCandidate: 'Add New Candidate',
      backToList: 'Back to Candidate List',
      cultureAnalysis: 'Culture Fit Analysis',
    },
    ko: {
      title: '문화 기반 채용',
      subtitle: '귀사의 고유한 조직 문화에 진정으로 맞는 후보자를 찾으세요',
      addCandidate: '새 후보자 추가',
      backToList: '후보자 목록으로 돌아가기',
      cultureAnalysis: '문화 적합성 분석',
    },
  };

  const handleAddCandidate = () => {
    console.log('Adding new candidate');
  };

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-2 text-gray-800"
        >
          {content[language].title}
        </motion.h1>
        <p className="text-center text-gray-600 mb-8">
          {content[language].subtitle}
        </p>

        <HiringInsights />

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          {!selectedCandidate ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                  {language === 'en' ? 'Candidates' : '후보자'}
                </h2>
                <button
                  onClick={handleAddCandidate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
                >
                  {content[language].addCandidate}
                </button>
              </div>
              <CandidateList onSelectCandidate={handleSelectCandidate} />
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300 shadow-md"
                >
                  {content[language].backToList}
                </button>
                <h2 className="text-2xl font-semibold text-gray-700">
                  {content[language].cultureAnalysis}
                </h2>
              </div>
              <CultureFitAnalysis candidateId={selectedCandidate} />
              <InterviewAssistant candidateId={selectedCandidate} />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
