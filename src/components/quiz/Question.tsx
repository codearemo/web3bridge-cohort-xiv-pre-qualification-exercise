import type { Question as QuestionType } from '../../types/quiz';
import { AnswerOption } from './AnswerOption';
import { Timer } from './Timer';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onSelectAnswer: (answerId: string) => void;
  onTimeUp: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  onTimeUp,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400';
      case 'medium':
        return 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400';
      case 'hard':
        return 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400';
      default:
        return 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400';
    }
  };

  return (
    <div>
      {/* Question Header */}
      <div className="p-4 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getDifficultyColor(
                question.difficulty
              )}`}
            >
              {question.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-info-100 text-info-700 dark:bg-info-900/30 dark:text-info-400">
              {question.category}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="p-4 mb-4">
        <Timer
          initialTime={question.timeLimit}
          onTimeUp={onTimeUp}
          isActive={!isAnswered}
        />
      </div>

      {/* Question Text */}
      <div className="mt-4 p-12 rounded-xl border-2 border-primary-200 dark:border-primary-700 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-secondary-800 mb-4">
        <h1 className="text-6xl font-extrabold leading-tight p-8 text-center text-primary-800 dark:text-primary-200">
          {question.question}
        </h1>
      </div>

      {/* Answer Options */}
      <div>
        {question.answers.map((answer, index) => (
          <div key={answer.id} className={index > 0 ? "mt-4" : ""}>
            <AnswerOption
              answer={answer}
              isSelected={selectedAnswer === answer.id}
              isAnswered={isAnswered}
              onSelect={onSelectAnswer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

