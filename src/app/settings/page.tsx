'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import DashboardLayout from '../../components/DashboardLayout';

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchCompanyProfile(user.uid);
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchCompanyProfile = async (userId: string) => {
    const docRef = doc(db, 'companies', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setCompanyName(data.name || '');
      setIndustry(data.industry || '');
      setEmployeeCount(data.employeeCount?.toString() || '');
    }
  };

  const content = {
    en: {
      title: 'Settings',
      companyName: 'Company Name',
      industry: 'Industry',
      employeeCount: 'Number of Employees',
      submit: 'Save Changes',
      success: 'Settings updated successfully!',
    },
    ko: {
      title: '설정',
      companyName: '회사명',
      industry: '업종',
      employeeCount: '직원 수',
      submit: '변경사항 저장',
      success: '설정이 성공적으로 업데이트되었습니다!',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateDoc(doc(db, 'companies', user.uid), {
        name: companyName,
        industry,
        employeeCount: Number(employeeCount),
      });
      alert(content[language].success);
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content[language].title}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {content[language].companyName}
            </label>
            <input
              type="text"
              id="companyName"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {content[language].industry}
            </label>
            <input
              type="text"
              id="industry"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="employeeCount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {content[language].employeeCount}
            </label>
            <input
              type="number"
              id="employeeCount"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {content[language].submit}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
