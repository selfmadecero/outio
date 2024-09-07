'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { auth, db } from '../../../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { User } from 'firebase/auth';

export default function InviteEmployees() {
  const [user, setUser] = useState<User | null>(null);
  const [emails, setEmails] = useState<string>('');
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const content = {
    en: {
      title: 'Invite Employees',
      description: 'Enter employee email addresses (comma-separated)',
      placeholder: 'employee1@example.com, employee2@example.com',
      submit: 'Send Invitations',
      success: 'Invitations sent successfully!',
    },
    ko: {
      title: '직원 초대',
      description: '직원 이메일 주소를 입력하세요 (쉼표로 구분)',
      placeholder: 'employee1@example.com, employee2@example.com',
      submit: '초대장 보내기',
      success: '초대장이 성공적으로 전송되었습니다!',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const emailList = emails.split(',').map((email) => email.trim());

    try {
      const surveyRef = doc(db, 'surveys', user.uid);
      await updateDoc(surveyRef, {
        invitedEmployees: arrayUnion(...emailList),
      });
      alert(content[language].success);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error inviting employees:', error);
      alert('Error inviting employees. Please try again.');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {content[language].title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="emails"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {content[language].description}
            </label>
            <textarea
              id="emails"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder={content[language].placeholder}
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              required
            />
          </div>
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
