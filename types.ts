export type ExpressionLevel = '초급' | '중급' | '고급';

export interface Expression {
  foreign: string;
  pronunciation: string;
  korean: string;
  level: ExpressionLevel;
}

export interface Language {
  code: string; // e.g., 'ja-JP'
  name: string; // e.g., '일본어'
  expressions: Expression[];
}

export interface QuizQuestion {
  question: string; // The foreign phrase
  options: string[]; // Shuffled Korean translations
  correctAnswer: string; // The correct Korean translation
}
