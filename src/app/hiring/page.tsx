'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  UserIcon,
  BriefcaseIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function Hiring() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('openPositions');

  const content = {
    en: {
      title: 'Hiring Dashboard',
      openPositions: 'Open Positions',
      candidates: 'Candidates',
      interviews: 'Interviews',
      createJob: 'Create New Job Posting',
    },
    ko: {
      title: '채용 대시보드',
      openPositions: '공개 채용',
      candidates: '지원자',
      interviews: '면접',
      createJob: '새 채용공고 작성',
    },
  };

  const tabContent = {
    openPositions: [
      { title: 'Software Engineer', department: 'Engineering', applicants: 45 },
      { title: 'Product Manager', department: 'Product', applicants: 32 },
      { title: 'UX Designer', department: 'Design', applicants: 28 },
    ],
    candidates: [
      { name: 'John Doe', position: 'Software Engineer', status: 'Screening' },
      { name: 'Jane Smith', position: 'Product Manager', status: 'Interview' },
      { name: 'Mike Johnson', position: 'UX Designer', status: 'Offer' },
    ],
    interviews: [
      {
        candidate: 'Alice Brown',
        position: 'Software Engineer',
        date: '2023-06-15',
      },
      {
        candidate: 'Bob Wilson',
        position: 'Product Manager',
        date: '2023-06-16',
      },
      { candidate: 'Carol Davis', position: 'UX Designer', date: '2023-06-17' },
    ],
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {content[language].title}
        </motion.h1>

        <div className="mb-8 flex justify-center space-x-4">
          {['openPositions', 'candidates', 'interviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {content[language][tab as keyof (typeof content)[language]]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tabContent[activeTab].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {activeTab === 'openPositions' && (
                <>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.department}</p>
                  <div className="flex items-center text-blue-500">
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span>{item.applicants} applicants</span>
                  </div>
                </>
              )}
              {activeTab === 'candidates' && (
                <>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.position}</p>
                  <div className="flex items-center text-green-500">
                    <BriefcaseIcon className="h-5 w-5 mr-2" />
                    <span>{item.status}</span>
                  </div>
                </>
              )}
              {activeTab === 'interviews' && (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.candidate}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.position}</p>
                  <div className="flex items-center text-purple-500">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{item.date}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300">
            {content[language].createJob}
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
