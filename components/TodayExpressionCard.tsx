import React from 'react';
import type { Expression } from '../types';
import PronunciationButton from './PronunciationButton';

interface TodayExpressionCardProps {
  expression: Expression | null;
  lang: string;
}

const TodayExpressionCard: React.FC<TodayExpressionCardProps> = ({ expression, lang }) => {
  if (!expression) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        표현을 불러오는 중입니다...
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-blue-500 to-sky-400 p-6 md:p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-100">
        ✨ 오늘의 표현 ✨
      </h2>
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <p className="text-4xl md:text-5xl font-extrabold tracking-wide">
            {expression.foreign}
          </p>
          <PronunciationButton
            text={expression.foreign}
            lang={lang}
            className="text-blue-100 hover:bg-white/20 hover:text-white focus:ring-white focus:ring-offset-blue-600"
          />
        </div>
        <p className="text-xl font-medium text-blue-200 mb-4">
          {expression.pronunciation}
        </p>
        <p className="text-2xl font-semibold text-white bg-black bg-opacity-20 rounded-lg px-4 py-2 inline-block">
          {expression.korean}
        </p>
      </div>
    </section>
  );
};

export default TodayExpressionCard;