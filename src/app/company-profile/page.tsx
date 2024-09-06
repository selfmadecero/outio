'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { db, auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const content = {
    en: {
      title: 'Company Profile',
      companyName: 'Company Name',
      industry: 'Industry',
      employeeCount: 'Number of Employees',
      submit: 'Save Profile',
    },
    ko: {
      title: '회사 프로필',
      companyName: '회사명',
      industry: '업종',
      employeeCount: '직원 수',
      submit: '프로필 저장',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user');
      }
      await setDoc(doc(db, 'companies', user.uid), {
        name: companyName,
        industry,
        employeeCount: Number(employeeCount),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving company profile:', error);
      // Handle error (show message to user)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {content[language].title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {content[language].companyName}
            </label>
            <input
              type="text"
              id="companyName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="industry"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {content[language].industry}
            </label>
            <input
              type="text"
              id="industry"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="employeeCount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {content[language].employeeCount}
            </label>
            <input
              type="number"
              id="employeeCount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {content[language].submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
