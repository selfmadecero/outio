import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface GuideItem {
  question: string;
  answerGuidelines: {
    excellent: string;
    good: string;
    average: string;
    poor: string;
  };
  scoringCriteria: {
    excellent: string;
    good: string;
    average: string;
    poor: string;
  };
}

const InterviewGuide: React.FC = () => {
  const { language } = useLanguage() as { language: 'en' | 'ko' };

  const content = {
    en: {
      title: 'Interview Scoring Guide',
      question: 'Question',
      answerGuidelines: 'Answer Guidelines',
      scoringCriteria: 'Scoring Criteria',
      excellent: 'Excellent (9-10)',
      good: 'Good (7-8)',
      average: 'Average (5-6)',
      poor: 'Poor (1-4)',
    },
    ko: {
      title: '면접 채점 가이드',
      question: '질문',
      answerGuidelines: '답변 가���드라인',
      scoringCriteria: '채점 기준',
      excellent: '우수 (9-10점)',
      good: '양호 (7-8점)',
      average: '보통 (5-6점)',
      poor: '미흡 (1-4점)',
    },
  };

  const guideItems: GuideItem[] = [
    {
      question:
        '우리 회사의 핵심 가치 중 하나인 "혁신과 창의성"에 대해 어떻게 생각하시나요?',
      answerGuidelines: {
        excellent:
          '회사의 가치를 깊이 이해하고 개인의 경험과 연결하여 구체적인 예시를 제시',
        good: '회사의 가치를 이해하고 있으며 관련된 개인의 경험을 언급',
        average:
          '회사의 가치에 대한 기본적인 이해를 보여주지만 구체적인 예시가 부족',
        poor: '회사의 가치에 대한 이해가 부족하거나 관련 없는 답변',
      },
      scoringCriteria: {
        excellent: '혁신과 창의성에 대한 깊은 이해와 실제 적용 사례를 제시',
        good: '혁신과 창의성의 중요성을 인식하고 있으며 관련 경험을 언급',
        average: '혁신과 창의성에 대한 기본적인 이해를 보여줌',
        poor: '혁신과 창의성에 대한 이해가 부족하거나 관련성 없는 답변',
      },
    },
    // 추가 질문들...
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{content[language].title}</h2>
      {guideItems.map((item, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">
            {content[language].question} {index + 1}:
          </h3>
          <p className="mb-4">{item.question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">
                {content[language].answerGuidelines}
              </h4>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">
                    {content[language].excellent}:
                  </span>{' '}
                  {item.answerGuidelines.excellent}
                </li>
                <li>
                  <span className="font-semibold">
                    {content[language].good}:
                  </span>{' '}
                  {item.answerGuidelines.good}
                </li>
                <li>
                  <span className="font-semibold">
                    {content[language].average}:
                  </span>{' '}
                  {item.answerGuidelines.average}
                </li>
                <li>
                  <span className="font-semibold">
                    {content[language].poor}:
                  </span>{' '}
                  {item.answerGuidelines.poor}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {content[language].scoringCriteria}
              </h4>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">
                    {content[language].excellent}:
                  </span>{' '}
                  {item.scoringCriteria.excellent}
                </li>
                <li>
                  <span className="font-semibold">
                    {content[language].good}:
                  </span>{' '}
                  {item.scoringCriteria.good}
                </li>
                <li>
                  <span className="font-semibold">
                    {content[language].average}:
                  </span>{' '}
                  {item.scoringCriteria.average}
                </li>
                <li>
                  <span className="font-semibold">
                    {content[language].poor}:
                  </span>{' '}
                  {item.scoringCriteria.poor}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewGuide;
