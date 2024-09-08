import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface CultureFitAnalysisProps {
  candidateId: string;
}

const CultureFitAnalysis: React.FC<CultureFitAnalysisProps> = ({
  candidateId,
}) => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title: 'Culture Fit Analysis',
      companyProfile: 'Company Culture Profile',
      candidateProfile: 'Candidate Profile',
      teamwork: 'Teamwork',
      innovation: 'Innovation',
      leadership: 'Leadership',
      communication: 'Communication',
      adaptability: 'Adaptability',
    },
    ko: {
      title: '문화 적합성 분석',
      companyProfile: '회사 문화 프로필',
      candidateProfile: '후보자 프로필',
      teamwork: '팀워크',
      innovation: '혁신',
      leadership: '리더십',
      communication: '의사소통',
      adaptability: '적응력',
    },
  };

  const labels = [
    content[language].teamwork,
    content[language].innovation,
    content[language].leadership,
    content[language].communication,
    content[language].adaptability,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: content[language].companyProfile,
        data: [90, 80, 85, 88, 82],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: content[language].candidateProfile,
        data: [85, 88, 78, 92, 86],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">{content[language].title}</h2>
      <div className="w-full h-96">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default CultureFitAnalysis;
