'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import DashboardLayout from '../../../components/DashboardLayout';
import { db } from '../../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

// content 객체의 타입 정의
type ContentType = {
  [key in 'en' | 'ko']: {
    title: string;
    description: string;
    placeholder: string;
    submit: string;
    success: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Invite Employees to Survey',
    description:
      'Enter email addresses of employees you want to invite, separated by commas.',
    placeholder: 'e.g. employee1@company.com, employee2@company.com',
    submit: 'Send Invitations',
    success: 'Invitations sent successfully!',
  },
  ko: {
    title: '설문조사에 직원 초대',
    description:
      '초대하려는 직원들의 이메일 주소를 쉼표로 구분하여 입력하세요.',
    placeholder: '예: employee1@company.com, employee2@company.com',
    submit: '초대장 보내기',
    success: '초대장이 성공적으로 발송되었습니다!',
  },
};

export default function InviteEmployees() {
  const [emails, setEmails] = useState('');
  const router = useRouter();
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailList = emails.split(',').map((email) => email.trim());

    try {
      const surveyRef = doc(db, 'surveys', 'currentSurveyId'); // Replace with actual survey ID
      await updateDoc(surveyRef, {
        invitedEmployees: arrayUnion(...emailList),
      });
      alert(content[language].success);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error inviting employees:', error);
      alert('An error occurred while sending invitations.');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{content[language].title}</h1>
        <p className="mb-4">{content[language].description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder={content[language].placeholder}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {content[language].submit}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
