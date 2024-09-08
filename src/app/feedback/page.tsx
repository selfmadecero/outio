'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Feedback {
  id: number;
  content: {
    ko: string;
    en: string;
  };
  category: string;
  likes: number;
  timestamp: string;
  isOwnFeedback: boolean;
}

const dummyFeedbacks: Feedback[] = [
  {
    id: 1,
    content: {
      ko: '우리 회사의 유연근무제 정책이 정말 좋습니다. 일과 삶의 균형을 잡는 데 큰 도움이 됩니다.',
      en: "I really like our company's flexible work policy. It helps a lot in balancing work and life.",
    },
    category: 'policy',
    likes: 15,
    timestamp: '2023-06-01 09:30',
    isOwnFeedback: false,
  },
  {
    id: 2,
    content: {
      ko: '팀 간 소통이 더 원활했으면 좋겠어요. 부서 간 협업 프로세스 개선이 필요해 보입니다.',
      en: 'I wish communication between teams was smoother. It seems we need to improve the inter-departmental collaboration process.',
    },
    category: 'culture',
    likes: 8,
    timestamp: '2023-06-02 14:15',
    isOwnFeedback: true,
  },
  {
    id: 3,
    content: {
      ko: '최근 도입된 멘토링 프로그램이 매우 유익합니다. 경력 개발에 큰 도움이 되고 있어요.',
      en: "The recently introduced mentoring program is very beneficial. It's been a great help for career development.",
    },
    category: 'welfare',
    likes: 12,
    timestamp: '2023-06-03 11:45',
    isOwnFeedback: false,
  },
  {
    id: 4,
    content: {
      ko: '사무실 환경이 더 개선되면 좋겠습니다. 특히 회의실 예약 시스템이 필요해 보입니다.',
      en: 'I hope the office environment could be improved. Especially, we seem to need a meeting room reservation system.',
    },
    category: 'environment',
    likes: 6,
    timestamp: '2023-06-04 16:20',
    isOwnFeedback: true,
  },
  {
    id: 5,
    content: {
      ko: '최근 진행된 팀 빌딩 활동이 정말 즐거웠습니다. 이런 기회가 더 많아졌으면 좋겠어요.',
      en: 'The recent team building activity was really enjoyable. I hope we have more opportunities like this.',
    },
    category: 'culture',
    likes: 20,
    timestamp: '2023-06-05 10:00',
    isOwnFeedback: false,
  },
];

// content 객체의 타입 정의
type ContentType = {
  en: {
    title: string;
    description: string;
    searchPlaceholder: string;
    inputPlaceholder: string;
    submit: string;
    categories: {
      all: string;
      culture: string;
      policy: string;
      environment: string;
      welfare: string;
    };
    likes: string;
    sortLatest: string;
    sortMostLiked: string;
    delete: string;
    selectCategory: string;
  };
  ko: {
    title: string;
    description: string;
    searchPlaceholder: string;
    inputPlaceholder: string;
    submit: string;
    categories: {
      all: string;
      culture: string;
      policy: string;
      environment: string;
      welfare: string;
    };
    likes: string;
    sortLatest: string;
    sortMostLiked: string;
    delete: string;
    selectCategory: string;
  };
};

const content: ContentType = {
  en: {
    title: 'Anonymous Feedback',
    description:
      'Share your thoughts anonymously and help shape our company culture. Your voice matters!',
    searchPlaceholder: 'Search...',
    inputPlaceholder: 'Share your feedback anonymously...',
    submit: 'Submit',
    categories: {
      all: 'All',
      culture: 'Culture',
      policy: 'Policy',
      environment: 'Environment',
      welfare: 'Welfare',
    },
    likes: 'Likes',
    sortLatest: 'Latest',
    sortMostLiked: 'Most Liked',
    delete: 'Delete',
    selectCategory: 'Select category',
  },
  ko: {
    title: '익명 피드백',
    description:
      '익명으로 의견을 공유하고 우리 회사의 문화를 함께 만들어가세요. 여러분의 목소리가 중요합니다!',
    searchPlaceholder: '검색...',
    inputPlaceholder: '익명으로 피드백을 공유하세요...',
    submit: '제출',
    categories: {
      all: '전체',
      culture: '문화',
      policy: '정책',
      environment: '환경',
      welfare: '복지',
    },
    likes: '좋아요',
    sortLatest: '최신순',
    sortMostLiked: '좋아요순',
    delete: '삭제',
    selectCategory: '카테고리 선택',
  },
};

export default function Feedback() {
  const { language } = useLanguage() as { language: 'en' | 'ko' };
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newFeedback, setNewFeedback] = useState('');
  const [newFeedbackCategory, setNewFeedbackCategory] = useState('culture');
  const [sortOrder, setSortOrder] = useState<'latest' | 'mostLiked'>('latest');

  useEffect(() => {
    setTimeout(() => {
      setFeedbacks(dummyFeedbacks);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch = feedback.content[language as 'ko' | 'en']
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || feedback.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  const handleLike = (id: number) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === id && !feedback.isOwnFeedback
          ? { ...feedback, likes: feedback.likes + 1 }
          : feedback
      )
    );
  };

  const handleDelete = (id: number) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  };

  const handleSubmitFeedback = () => {
    if (newFeedback.trim()) {
      const newFeedbackItem: Feedback = {
        id: feedbacks.length + 1,
        content: {
          ko: newFeedback,
          en: newFeedback, // 실제로는 번역 로직이 필요할 수 있습니다
        },
        category: newFeedbackCategory,
        likes: 0,
        timestamp: new Date().toISOString(),
        isOwnFeedback: true,
      };
      setFeedbacks([newFeedbackItem, ...feedbacks]);
      setNewFeedback('');
      setNewFeedbackCategory('culture');
    }
  };

  const renderContent = () => (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800 flex items-center">
          <ChatBubbleLeftRightIcon className="h-10 w-10 mr-4 text-blue-500" />
          {content[language].title}
        </h1>
        <p className="text-gray-600 mb-6">{content[language].description}</p>
        <div className="mb-6">
          <textarea
            placeholder={content[language].inputPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition duration-300 text-gray-700"
            rows={3}
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <select
              value={newFeedbackCategory}
              onChange={(e) => setNewFeedbackCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition duration-300 text-gray-700 bg-white"
            >
              {Object.entries(content[language].categories).map(
                ([key, value]) =>
                  key !== 'all' && (
                    <option key={key} value={key} className="text-gray-700">
                      {value}
                    </option>
                  )
              )}
            </select>
            <button
              onClick={handleSubmitFeedback}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            >
              {content[language].submit}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            {Object.entries(content[language].categories).map(
              ([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                    selectedCategory === key
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              )
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder={content[language].searchPlaceholder}
                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition duration-300 text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>
            <select
              onChange={(e) =>
                setSortOrder(e.target.value as 'latest' | 'mostLiked')
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition duration-300 text-gray-700 bg-white"
            >
              <option value="latest" className="text-gray-700">
                {content[language].sortLatest}
              </option>
              <option value="mostLiked" className="text-gray-700">
                {content[language].sortMostLiked}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedFeedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <p className="text-gray-800 mb-4 text-lg">
              {feedback.content[language as 'ko' | 'en']}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                {
                  content[language].categories[
                    feedback.category as keyof typeof content.en.categories
                  ]
                }
              </span>
              <div className="flex space-x-4 items-center">
                <button
                  onClick={() => handleLike(feedback.id)}
                  className={`flex items-center space-x-1 ${
                    feedback.isOwnFeedback
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-pink-500 hover:text-pink-600'
                  } transition duration-300`}
                  disabled={feedback.isOwnFeedback}
                >
                  <HeartIcon className="h-5 w-5" />
                  <span>
                    {feedback.likes} {content[language].likes}
                  </span>
                </button>
                {feedback.isOwnFeedback && (
                  <button
                    onClick={() => handleDelete(feedback.id)}
                    className="text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
                <span>{feedback.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {isLoading ? <LoadingSpinner /> : renderContent()}
    </DashboardLayout>
  );
}
