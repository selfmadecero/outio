'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRouter } from 'next/navigation';

// content 객체의 타입 정의
type ContentType = {
  en: {
    title: string;
    companyName: string;
    industry: string;
    employeeCount: string;
    submit: string;
  };
  ko: {
    title: string;
    companyName: string;
    industry: string;
    employeeCount: string;
    submit: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Company Profile',
    companyName: 'Company Name',
    industry: 'Industry',
    employeeCount: 'Number of Employees',
    submit: 'Submit',
  },
  ko: {
    title: '회사 프로필',
    companyName: '회사명',
    industry: '산업',
    employeeCount: '직원 수',
    submit: '제출',
  },
};

export default function CompanyProfile() {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 제출 로직 추가
    console.log({ companyName, industry, employeeCount });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {content[language].title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block mb-2 font-medium">
              {content[language].companyName}
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block mb-2 font-medium">
              {content[language].industry}
            </label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="employeeCount" className="block mb-2 font-medium">
              {content[language].employeeCount}
            </label>
            <input
              type="number"
              id="employeeCount"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {content[language].submit}
          </button>
        </form>
      </div>
    </div>
  );
}
