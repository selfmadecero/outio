import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HiringInsights: React.FC = () => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title: 'Hiring Insights',
      openPositions: 'Open Positions',
      applicants: 'Total Applicants',
      interviewsScheduled: 'Interviews Scheduled',
      averageHiringTime: 'Average Hiring Time',
      hiringFunnel: 'Hiring Funnel',
      applications: 'Applications',
      screening: 'Screening',
      interviews: 'Interviews',
      offers: 'Offers',
      hires: 'Hires',
    },
    ko: {
      title: '채용 인사이트',
      openPositions: '공개 채용 포지션',
      applicants: '총 지원자 수',
      interviewsScheduled: '예정된 면접',
      averageHiringTime: '평균 채용 소요 시간',
      hiringFunnel: '채용 퍼널',
      applications: '지원',
      screening: '서류 심사',
      interviews: '면접',
      offers: '제안',
      hires: '채용',
    },
  };

  const funnelData = {
    labels: [
      content[language].applications,
      content[language].screening,
      content[language].interviews,
      content[language].offers,
      content[language].hires,
    ],
    datasets: [
      {
        label: content[language].hiringFunnel,
        data: [500, 200, 100, 50, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        {content[language].title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <InsightCard
          title={content[language].openPositions}
          value="5"
          icon="🚀"
        />
        <InsightCard
          title={content[language].applicants}
          value="500"
          icon="👥"
        />
        <InsightCard
          title={content[language].interviewsScheduled}
          value="50"
          icon="📅"
        />
        <InsightCard
          title={content[language].averageHiringTime}
          value="21 days"
          icon="⏱️"
        />
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">
          {content[language].hiringFunnel}
        </h3>
        <div className="h-80">
          <Bar options={options as any} data={funnelData} />
        </div>
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ title: string; value: string; icon: string }> = ({
  title,
  value,
  icon,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center mb-3">
      <span className="text-3xl mr-3">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default HiringInsights;
