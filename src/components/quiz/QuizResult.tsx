import { useState } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { LiveMenuButton, LiveMenuInput, LiveMenuCard } from '@codearemo/livemenu-ui';
import type { PlayerScore } from '../../types/quiz';
import { calculatePercentage, isLeaderboardScore } from '../../utils/storage';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onSaveScore: (playerScore: PlayerScore) => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onRestart,
  onSaveScore,
}) => {
  const [playerName, setPlayerName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const percentage = calculatePercentage(score, totalQuestions);
  const isHighScore = isLeaderboardScore(score);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'Outstanding! 🎉';
    if (percentage >= 80) return 'Excellent! 👏';
    if (percentage >= 70) return 'Great Job! 👍';
    if (percentage >= 60) return 'Good Effort! 💪';
    if (percentage >= 50) return 'Not Bad! 😊';
    return 'Keep Practicing! 📚';
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return 'text-success-600 dark:text-success-400';
    if (percentage >= 60) return 'text-info-600 dark:text-info-400';
    if (percentage >= 40) return 'text-warning-600 dark:text-warning-400';
    return 'text-danger-600 dark:text-danger-400';
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;

    const playerScore: PlayerScore = {
      name: playerName.trim(),
      score,
      totalQuestions,
      percentage,
      date: new Date().toISOString(),
    };

    onSaveScore(playerScore);
    setIsSaved(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <LiveMenuCard>
        <div className="p-10 text-center">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-8 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <Trophy className="w-16 h-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>

          {/* Performance Message */}
          <div className="mb-6">
            <h2 className={`text-4xl font-bold mb-4 ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              You've completed the quiz!
            </p>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-3 gap-6 py-8 mb-6 mt-4">
            <div className="p-6 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
              <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                {score}
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Correct
              </p>
            </div>

            <div className="p-6 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
              <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                {percentage}%
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Accuracy
              </p>
            </div>

            <div className="p-6 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
              <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                {totalQuestions}
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Total
              </p>
            </div>
          </div>

          {/* Save to Leaderboard */}
          {isHighScore && !isSaved && (
            <div className="p-6 mt-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800 mb-6">
              <p className="text-success-700 dark:text-success-400 font-semibold mb-6">
                Congratulations! Your score qualifies for the leaderboard!
              </p>
              <div className="flex gap-4">
                <LiveMenuInput
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
                  fullWidth
                  className="flex-1"
                />
                <LiveMenuButton
                  variant="success"
                  onClick={handleSaveScore}
                  disabled={!playerName.trim()}
                >
                  Save Score
                </LiveMenuButton>
              </div>
            </div>
          )}

          {isSaved && (
            <div className="p-6 bg-info-50 dark:bg-info-900/20 rounded-lg border border-info-200 dark:border-info-800 mb-6">
              <p className="text-info-700 dark:text-info-400 font-semibold">
                Score saved successfully! Check the leaderboard.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-6 mt-4">
            <LiveMenuButton
              variant="primary"
              size="lg"
              onClick={onRestart}
              className="min-w-[200px]"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </LiveMenuButton>
          </div>
        </div>
      </LiveMenuCard>
    </div>
  );
};

