import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';

interface SuccessPopupProps {
  language: 'en' | 'ko';
}

const content = {
  en: {
    title: 'Survey Deployed Successfully!',
    message: 'Your survey has been sent out to the participants.',
    goToSurvey: 'Go to Survey',
    backToSurveys: 'Back to Surveys',
  },
  ko: {
    title: '설문조사 발송 완료!',
    message: '설문조사가 참여자들에게 성공적으로 발송되었습니다.',
    goToSurvey: '설문조사 하러가기',
    backToSurveys: '설문조사 목록으로 돌아가기',
  },
};

const SuccessPopup: React.FC<SuccessPopupProps> = ({ language }) => {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">
          {content[language].title}
        </h2>
        <p className="mb-6 text-gray-600">{content[language].message}</p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/surveys/participate')}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {content[language].goToSurvey}
          </button>
          <button
            onClick={() => router.push('/surveys')}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            {content[language].backToSurveys}
          </button>
        </div>
      </div>
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none z-50"
          id="confetti-canvas"
        />
      )}
    </motion.div>
  );
};

export default SuccessPopup;
