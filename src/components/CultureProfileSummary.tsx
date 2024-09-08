import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CultureProfileSummary = () => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title: 'Culture Profile Summary',
      teamwork: 'Teamwork',
      innovation: 'Innovation',
      leadership: 'Leadership',
      communication: 'Communication',
      adaptability: 'Adaptability',
      companyValues: 'Company Values',
      cultureStrengths: 'Culture Strengths',
      areasForImprovement: 'Areas for Improvement',
    },
    ko: {
      title: '문화 프로필 요약',
      teamwork: '팀워크',
      innovation: '혁신',
      leadership: '리더십',
      communication: '의사소통',
      adaptability: '적응력',
      companyValues: '회사 가치',
      cultureStrengths: '문화적 강점',
      areasForImprovement: '개선 영역',
    },
  };

  const radarData = {
    labels: [
      content[language].teamwork,
      content[language].innovation,
      content[language].leadership,
      content[language].communication,
      content[language].adaptability,
    ],
    datasets: [
      {
        label: content[language].title,
        data: [85, 72, 68, 80, 75],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{content[language].title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Radar data={radarData} options={radarOptions} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {content[language].companyValues}
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>혁신과 창의성</li>
            <li>고객 중심</li>
            <li>팀워크와 협력</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            {content[language].cultureStrengths}
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>강력한 팀워크 문화</li>
            <li>개방적인 의사소통</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            {content[language].areasForImprovement}
          </h3>
          <ul className="list-disc list-inside">
            <li>리더십 개발</li>
            <li>혁신 프로세스 개선</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CultureProfileSummary;
