import React, { useState, useEffect, useMemo } from 'react';
import type { Expression, QuizQuestion } from '../types';
import Celebration from './Celebration';

interface QuizProps {
  expressions: Expression[];
  onFinish: () => void;
}

const QUIZ_LENGTH = 3;

const Quiz: React.FC<QuizProps> = ({ expressions, onFinish }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  useEffect(() => {
    const generateQuestions = () => {
      const shuffled = [...expressions].sort(() => 0.5 - Math.random());
      const selectedExpressions = shuffled.slice(0, QUIZ_LENGTH);
      
      const newQuestions = selectedExpressions.map(correctExpr => {
        const incorrectAnswers = shuffled
          .filter(expr => expr.korean !== correctExpr.korean)
          .slice(0, 2)
          .map(expr => expr.korean);
          
        const options = [correctExpr.korean, ...incorrectAnswers].sort(() => 0.5 - Math.random());
        
        return {
          question: correctExpr.foreign,
          options: options,
          correctAnswer: correctExpr.korean,
        };
      });
      setQuestions(newQuestions);
    };
    
    generateQuestions();
  }, [expressions]);

  const score = useMemo(() => {
    return userAnswers.reduce((acc, answer, index) => {
      if (questions[index] && questions[index].correctAnswer === answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers, questions]);

  const handleAnswerClick = (answer: string) => {
    if (feedback) return; // Prevent multiple clicks

    const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;
    setFeedback({ message: isCorrect ? '정답입니다!' : '오답입니다!', isCorrect });
    
    setTimeout(() => {
      setUserAnswers(prev => [...prev, answer]);
      setFeedback(null);
      if (currentQuestionIndex < QUIZ_LENGTH - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsQuizOver(true);
      }
    }, 1000);
  };
  
  if (questions.length === 0) {
    return <div className="text-center p-8">퀴즈를 준비 중입니다...</div>;
  }
  
  if (isQuizOver) {
    const isSuccess = score >= 2;
    return (
      <div className="relative bg-white p-8 rounded-xl shadow-lg text-center max-w-lg mx-auto">
        {isSuccess && <Celebration />}
        <h2 className="text-3xl font-bold mb-4">{isSuccess ? '훌륭해요!' : '아쉬워요!'}</h2>
        <p className="text-xl mb-6">총 {QUIZ_LENGTH}문제 중 <strong className="text-blue-500">{score}개</strong>를 맞혔습니다.</p>
        <button
          onClick={onFinish}
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          학습으로 돌아가기
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto">
      <div className="mb-6">
        <p className="text-sm text-slate-500">문제 {currentQuestionIndex + 1} / {QUIZ_LENGTH}</p>
        <p className="text-lg mt-2">다음 표현의 한국어 뜻은 무엇일까요?</p>
        <p className="text-3xl font-bold my-4 text-center p-4 bg-slate-100 rounded-lg">{currentQuestion.question}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={!!feedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 font-medium
              ${feedback && option === currentQuestion.correctAnswer ? 'bg-green-100 border-green-400' : ''}
              ${feedback && option !== currentQuestion.correctAnswer && userAnswers[userAnswers.length - 1] === option && option !== currentQuestion.correctAnswer ? 'bg-red-100 border-red-400' : ''}
              ${!feedback ? 'bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-300' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`mt-4 text-center font-bold ${feedback.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default Quiz;