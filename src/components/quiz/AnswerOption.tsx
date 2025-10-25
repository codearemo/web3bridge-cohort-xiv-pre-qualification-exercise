import type { Answer } from '../../types/quiz';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  answer: Answer;
  isSelected: boolean;
  isAnswered: boolean;
  onSelect: (answerId: string) => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  answer,
  isSelected,
  isAnswered,
  onSelect,
}) => {
  const getButtonClass = () => {
    const baseClass =
      'w-full p-8 rounded-lg border-2 transition-all duration-200 text-left flex items-center justify-between min-h-[80px]';

    if (!isAnswered) {
      return `${baseClass} ${
        isSelected
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
          : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:bg-secondary-800 hover:shadow-sm'
      } cursor-pointer`;
    }

    // After answering
    if (answer.isCorrect) {
      return `${baseClass} border-success-500 bg-success-50 dark:bg-success-900/20 cursor-not-allowed shadow-md`;
    }

    if (isSelected && !answer.isCorrect) {
      return `${baseClass} border-danger-500 bg-danger-50 dark:bg-danger-900/20 cursor-not-allowed shadow-md`;
    }

    return `${baseClass} border-secondary-300 dark:border-secondary-600 bg-secondary-50 dark:bg-secondary-800 cursor-not-allowed opacity-50`;
  };

  const handleClick = () => {
    if (!isAnswered) {
      onSelect(answer.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAnswered}
      className={getButtonClass()}
    >
      <span className="font-medium">
        {answer.text}
      </span>

      {isAnswered && (
        <div>
          {answer.isCorrect && (
            <Check className="w-6 h-6 text-success-600" strokeWidth={3} />
          )}
          {isSelected && !answer.isCorrect && (
            <X className="w-6 h-6 text-danger-600" strokeWidth={3} />
          )}
        </div>
      )}
    </button>
  );
};

