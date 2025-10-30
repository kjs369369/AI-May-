import React from 'react';
import type { Expression } from '../types';
import PronunciationButton from './PronunciationButton';

interface ExpressionCardProps {
  expression: Expression;
  lang: string;
}

const ExpressionCard: React.FC<ExpressionCardProps> = ({ expression, lang }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <p className="text-2xl font-bold text-slate-800">
          {expression.foreign}
        </p>
        <PronunciationButton
          text={expression.foreign}
          lang={lang}
          className="text-slate-400 hover:bg-slate-100 hover:text-blue-500 focus:ring-blue-400 focus:ring-offset-white"
        />
      </div>
      <p className="text-md text-slate-500 mb-3">
        {expression.pronunciation}
      </p>
      <p className="text-lg font-medium text-blue-600">
        {expression.korean}
      </p>
    </div>
  );
};

export default ExpressionCard;