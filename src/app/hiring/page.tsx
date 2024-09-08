'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import HiringInsights from '../../components/HiringInsights';
import CandidateList from '../../components/CandidateList';
import CandidateDetail from '../../components/CandidateDetail';
import WaitlistPopup from '../../components/WaitlistPopup';

// AddCandidatePopup 컴포넌트
const AddCandidatePopup = ({
  isOpen,
  onClose,
  language,
}: {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ko';
}) => {
  const content = {
    en: {
      title: '새 후보자 추가',
      name: '이름',
      email: '이메일',
      position: '직무',
      submit: '제출',
      cancel: '취소',
    },
    ko: {
      title: '새 후보자 추가',
      name: '이름',
      email: '이메일',
      position: '직무',
      submit: '제출',
      cancel: '취소',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {content[language].title}
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {content[language].name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {content[language].email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700"
                >
                  {content[language].position}
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {content[language].cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {content[language].submit}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Hiring() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [isWaitlistPopupOpen, setIsWaitlistPopupOpen] = useState(false);
  const [isAddCandidatePopupOpen, setIsAddCandidatePopupOpen] = useState(false);

  const content = {
    en: {
      title: 'Unlock Your Culture,\nUnleash Top Talent',
      subtitle:
        "Outio helps companies objectively understand their unique organizational culture\nand identify talent that best fits that culture.\n\nWe don't judge specific cultures as 'good' or 'bad'.\nInstead, we focus on accurately capturing each company's unique cultural characteristics\nand finding talent that aligns best with that culture.",
      addCandidate: 'Add New Candidate',
      backToList: 'Back to Candidate List',
      candidates: 'Candidates',
      loading: 'Loading...',
      recommendButton: 'Get Talent Recommendations Aligned with Your Culture',
    },
    ko: {
      title: '조직 문화의 힘을 깨우고,\n최고의 인재를 발견하세요',
      subtitle:
        'Outio는 기업들이 그들의 고유한 조직 문화를 객관적으로 이해하고,\n그 문화에 가장 잘 맞는 인재를 식별할 수 있도록 돕습니다.\n\n우리는 특정한 문화를 "좋다"거나 "나쁘다"고 판단하지 않습니다.\n대신, 각 기업의 독특한 문화적 특성을 정확하게 파악하고,\n그 문화에 가장 잘 맞는 인재를 찾는 데 초점을 맞춥니다.',
      addCandidate: '새 후보자 추가',
      backToList: '후보자 목록으로 돌아가기',
      candidates: '후보자',
      loading: '로딩 중...',
      recommendButton: '우리 조직문화와 가장 잘 맞는 인재 추천받기',
    },
  };

  const handleAddCandidate = () => {
    setIsAddCandidatePopupOpen(true);
  };

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };

  const handleRecommendation = () => {
    setIsWaitlistPopupOpen(true);
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
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={handleRecommendation}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {content[language].recommendButton}
          </motion.button>
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
      <WaitlistPopup
        isOpen={isWaitlistPopupOpen}
        onClose={() => setIsWaitlistPopupOpen(false)}
        language={language}
      />
      <AddCandidatePopup
        isOpen={isAddCandidatePopupOpen}
        onClose={() => setIsAddCandidatePopupOpen(false)}
        language={language}
      />
    </DashboardLayout>
  );
}
