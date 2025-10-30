import React, { useState, useMemo } from 'react';
import { LANGUAGES } from './constants/expressions';
import { useDailyExpression } from './hooks/useDailyExpression';
import Header from './components/Header';
import TodayExpressionCard from './components/TodayExpressionCard';
import ExpressionCard from './components/ExpressionCard';
import LanguageSelector from './components/LanguageSelector';
import LevelSelector from './components/LevelSelector';
import SearchBar from './components/SearchBar';
import Quiz from './components/Quiz';
import type { ExpressionLevel } from './types';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedLevel, setSelectedLevel] = useState<ExpressionLevel | '전체'>('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [isQuizMode, setQuizMode] = useState(false);

  const expressionsByLevel = useMemo(() => {
    if (selectedLevel === '전체') {
      return selectedLanguage.expressions;
    }
    return selectedLanguage.expressions.filter(e => e.level === selectedLevel);
  }, [selectedLanguage, selectedLevel]);

  const filteredExpressions = useMemo(() => {
    if (!searchTerm.trim()) {
      return expressionsByLevel;
    }
    const lowercasedTerm = searchTerm.toLowerCase().trim();
    return expressionsByLevel.filter(e => 
      e.foreign.toLowerCase().includes(lowercasedTerm) ||
      e.pronunciation.toLowerCase().includes(lowercasedTerm) ||
      e.korean.toLowerCase().includes(lowercasedTerm)
    );
  }, [expressionsByLevel, searchTerm]);

  const { dailyExpression } = useDailyExpression(expressionsByLevel);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <LanguageSelector 
          languages={LANGUAGES}
          selectedLanguageCode={selectedLanguage.code}
          onSelectLanguage={(lang) => {
            setSelectedLanguage(lang);
            setQuizMode(false);
            setSearchTerm('');
          }}
        />
        <LevelSelector
          selectedLevel={selectedLevel}
          onSelectLevel={(level) => {
            setSelectedLevel(level);
            setQuizMode(false);
            setSearchTerm('');
          }}
        />
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {isQuizMode 
          ? <Quiz expressions={filteredExpressions} onFinish={() => setQuizMode(false)} />
          : (
            <>
              {!searchTerm && dailyExpression && (
                <TodayExpressionCard expression={dailyExpression} lang={selectedLanguage.code} />
              )}
              
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setQuizMode(true)}
                  disabled={filteredExpressions.length < 3}
                  className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-600 transition-transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
                  title={filteredExpressions.length < 3 ? "퀴즈를 만들기에 표현이 부족합니다." : ""}
                >
                  퀴즈에 도전하기!
                </button>
                {filteredExpressions.length < 3 && <p className="text-sm text-slate-500 mt-2">퀴즈는 최소 3개 이상의 표현이 필요합니다.</p>}
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-700 mb-6 border-b-2 border-sky-200 pb-2">
                  {searchTerm ? `"${searchTerm}" 검색 결과` : '모든 표현 둘러보기'}
                </h2>
                {filteredExpressions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExpressions.map((expression, index) => (
                      <ExpressionCard key={`${expression.foreign}-${index}`} expression={expression} lang={selectedLanguage.code} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <p className="text-slate-600 font-semibold">
                      {searchTerm ? '검색 결과가 없습니다.' : '선택하신 난이도에 해당하는 표현이 없습니다.'}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      {searchTerm ? '다른 키워드로 검색해보세요.' : '다른 난이도를 선택해주세요.'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )
        }
      </main>
      <footer className="text-center p-6 text-slate-500 text-sm">
        <p>제작 및 문의 : AICLAB 김진수 010-8921-9536</p>
      </footer>
    </div>
  );
};

export default App;
