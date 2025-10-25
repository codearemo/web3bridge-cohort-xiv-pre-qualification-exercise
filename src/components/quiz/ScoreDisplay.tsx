import { Trophy, Target } from 'lucide-react';

interface ScoreDisplayProps {
  currentScore: number;
  totalQuestions: number;
  currentQuestion: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  currentScore,
  totalQuestions,
  currentQuestion,
}) => {
  const percentage = totalQuestions > 0 
    ? Math.round((currentScore / totalQuestions) * 100) 
    : 0;

  return (
    <div className="flex items-center gap-8 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700 shadow-sm mb-4">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <Trophy className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Score
          </p>
          <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {currentScore} / {totalQuestions}
          </p>
        </div>
      </div>

      <div className="h-16 w-px bg-secondary-300 dark:bg-secondary-600" />

      <div className="flex items-center gap-4">
        <div className="p-4 bg-info-100 dark:bg-info-900/30 rounded-lg">
          <Target className="w-6 h-6 text-info-600 dark:text-info-400" />
        </div>
        <div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Progress
          </p>
          <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {currentQuestion > totalQuestions ? totalQuestions : currentQuestion} / {totalQuestions}
          </p>
        </div>
      </div>

      {currentQuestion > 1 && (
        <>
          <div className="h-16 w-px bg-secondary-300 dark:bg-secondary-600" />
          <div>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Accuracy
            </p>
            <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              {percentage}%
            </p>
          </div>
        </>
      )}
    </div>
  );
};

