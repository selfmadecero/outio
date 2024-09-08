'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import HiringInsights from '../../components/HiringInsights';
import CandidateList from '../../components/CandidateList';
import CandidateDetail from '../../components/CandidateDetail';

export default function Hiring() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title:
        'Innovative Solution for Understanding\nOrganizational Culture and Hiring the Best-Fit Talent',
      subtitle:
        "In today's competitive business environment, an organization's success\ndepends not just on technical skills or innovative products, \n\nbut on how well its people work together in harmony with the organization's unique culture.\n\nOutio is an innovative SaaS platform designed to help companies\nsucceed in this crucial aspect.",
      addCandidate: 'Add New Candidate',
      backToList: 'Back to Candidate List',
      candidates: 'Candidates',
      loading: 'Loading...',
    },
    ko: {
      title:
        '조직 문화를 이해하고,\n가장 잘 맞는 인재를 채용하는 혁신적 솔루션',
      subtitle:
        '오늘날의 경쟁이 치열한 비즈니스 환경에서 조직의 성공은\n단순히 뛰어난 기술력이나 혁신적인 제품에만 달려있지 않습니다.\n\n그보다는 조직의 고유한 문화와 그 문화를 공유하는 인재들이\n얼마나 잘 조화롭게 일하는가에 더 많이 좌우됩니다.\n\nOutio는 바로 이 부분에서 기업들이 성공을 거둘 수 있도록\n돕는 혁신적인 SaaS 플랫폼입니다.',
      addCandidate: '새 후보자 추가',
      backToList: '후보자 목록으로 돌아가기',
      candidates: '후보자',
      loading: '로딩 중...',
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 whitespace-pre-line"
          >
            {content[language].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line"
          >
            {content[language].subtitle}
          </motion.p>
        </div>

        <HiringInsights />

        <div className="mt-16 bg-white rounded-xl shadow-lg p-6">
          {!selectedCandidate ? (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {content[language].candidates}
                </h2>
                <button
                  onClick={handleAddCandidate}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  {content[language].addCandidate}
                </button>
              </div>
              <CandidateList onSelectCandidate={handleSelectCandidate} />
            </>
          ) : (
            <>
              <div className="mb-6">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  {content[language].backToList}
                </button>
              </div>
              <CandidateDetail candidateId={selectedCandidate} />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
