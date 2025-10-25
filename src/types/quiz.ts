export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
}

export interface QuizData {
  questions: Question[];
}

export interface PlayerScore {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  showResult: boolean;
  timeRemaining: number;
}

