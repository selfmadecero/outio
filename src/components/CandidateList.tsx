import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Candidate {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  position: string;
  status: string;
  cultureFitScore: number;
}

interface CandidateListProps {
  onSelectCandidate: (candidateId: string) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ onSelectCandidate }) => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [sortBy, setSortBy] = useState<
    'name' | 'position' | 'status' | 'cultureFitScore'
  >('cultureFitScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const candidates: Candidate[] = [
    {
      id: '1',
      name: { ko: '홍길동', en: 'Gildong Hong' },
      position: '소프트웨어 엔지니어',
      status: 'Screening',
      cultureFitScore: 85,
    },
    {
      id: '2',
      name: { ko: '김철수', en: 'Chulsoo Kim' },
      position: '제품 관리자',
      status: 'Interview',
      cultureFitScore: 92,
    },
    {
      id: '3',
      name: { ko: '이영희', en: 'Younghee Lee' },
      position: 'UX 디자이너',
      status: 'Offer',
      cultureFitScore: 78,
    },
  ];

  const content = {
    en: {
      title: 'Candidate List',
      name: 'Name',
      position: 'Position',
      status: 'Status',
      cultureFitScore: 'Culture Fit Score',
      viewDetails: 'View Details',
      softwareEngineer: 'Software Engineer',
      productManager: 'Product Manager',
      uxDesigner: 'UX Designer',
      screening: 'Screening',
      interview: 'Interview',
      offer: 'Offer',
    },
    ko: {
      title: '후보자 목록',
      name: '이름',
      position: '직무',
      status: '상태',
      cultureFitScore: '문화 적합성 점수',
      viewDetails: '상세 보기',
      softwareEngineer: '소프트웨어 엔지니어',
      productManager: '제품 관리자',
      uxDesigner: 'UX 디자이너',
      screening: '서류 심사',
      interview: '면접',
      offer: '채용 제안',
    },
  };

  const getTranslatedPosition = (position: string) => {
    switch (position) {
      case '소프트웨어 엔지니어':
        return content[language].softwareEngineer;
      case '제품 관리자':
        return content[language].productManager;
      case 'UX 디자이너':
        return content[language].uxDesigner;
      default:
        return position;
    }
  };

  const getTranslatedStatus = (status: string) => {
    switch (status) {
      case 'Screening':
        return content[language].screening;
      case 'Interview':
        return content[language].interview;
      case 'Offer':
        return content[language].offer;
      default:
        return status;
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name[language].localeCompare(b.name[language])
        : b.name[language].localeCompare(a.name[language]);
    } else if (sortBy === 'cultureFitScore') {
      return sortOrder === 'asc'
        ? a.cultureFitScore - b.cultureFitScore
        : b.cultureFitScore - a.cultureFitScore;
    } else {
      return sortOrder === 'asc'
        ? (a[sortBy as keyof Candidate] as string).localeCompare(
            b[sortBy as keyof Candidate] as string
          )
        : (b[sortBy as keyof Candidate] as string).localeCompare(
            a[sortBy as keyof Candidate] as string
          );
    }
  });

  const handleSort = (
    column: 'name' | 'position' | 'status' | 'cultureFitScore'
  ) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['name', 'position', 'status', 'cultureFitScore'].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() =>
                  handleSort(
                    header as 'name' | 'position' | 'status' | 'cultureFitScore'
                  )
                }
              >
                {content[language][header as keyof typeof content.en]}
                {sortBy === header && (
                  <span className="ml-2">
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">{content[language].viewDetails}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedCandidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {candidate.name[language]}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {getTranslatedPosition(candidate.position)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {getTranslatedStatus(candidate.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {candidate.cultureFitScore}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onSelectCandidate(candidate.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  {content[language].viewDetails}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
