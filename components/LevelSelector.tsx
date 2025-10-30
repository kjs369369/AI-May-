import React from 'react';
import type { ExpressionLevel } from '../types';

interface LevelSelectorProps {
  selectedLevel: ExpressionLevel | '전체';
  onSelectLevel: (level: ExpressionLevel | '전체') => void;
}

const LEVELS: (ExpressionLevel | '전체')[] = ['전체', '초급', '중급', '고급'];

const LevelSelector: React.FC<LevelSelectorProps> = ({ selectedLevel, onSelectLevel }) => {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 bg-white p-2 rounded-full shadow-inner w-fit mx-auto">
      {LEVELS.map(level => (
        <button
          key={level}
          onClick={() => onSelectLevel(level)}
          className={`px-4 py-1.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300
            ${selectedLevel === level
              ? 'bg-blue-500 text-white shadow'
              : 'bg-transparent text-slate-500 hover:bg-blue-100'
            }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;
