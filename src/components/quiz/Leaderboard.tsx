import { Trophy, Medal, Award, Trash2 } from 'lucide-react';
import { LiveMenuCard, LiveMenuButton, LiveMenuBadge } from '@codearemo/livemenu-ui';
import type { PlayerScore } from '../../types/quiz';
import { formatDate } from '../../utils/storage';

interface LeaderboardProps {
  scores: PlayerScore[];
  onClear: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, onClear }) => {
  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-warning-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-secondary-400" />;
      case 2:
        return <Award className="w-6 h-6 text-warning-700" />;
      default:
        return <span className="text-secondary-600 dark:text-secondary-400 font-bold text-lg">{index + 1}</span>;
    }
  };

  const getRankBadgeVariant = (index: number): "primary" | "success" | "warning" => {
    if (index === 0) return 'warning';
    if (index === 1) return 'success';
    return 'primary';
  };

  if (scores.length === 0) {
    return (
      <LiveMenuCard title="🏆 Leaderboard">
        <div className="text-center py-16">
          <Trophy className="w-16 h-16 text-secondary-400 dark:text-secondary-600 mx-auto mb-6" />
          <p className="text-secondary-600 dark:text-secondary-400">
            No scores yet. Be the first to play!
          </p>
        </div>
      </LiveMenuCard>
    );
  }

  return (
    <LiveMenuCard>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          🏆 Leaderboard
        </h2>
        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-6">
          Top players and their scores
        </p>
        
        <div>
        {scores.map((score, index) => (
          <div
            key={`${score.name}-${score.date}`}
            className={`p-6 rounded-lg border ${
              index < 3
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                : 'bg-white dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700'
            } ${index > 0 ? 'mt-4' : ''}`}
          >
            <div className="flex items-center justify-between gap-6">
              {/* Rank & Name */}
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div className="flex-shrink-0 w-12 flex justify-center">
                  {getMedalIcon(index)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-secondary-900 dark:text-secondary-100 truncate">
                    {score.name}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {formatDate(score.date)}
                  </p>
                </div>
              </div>

              {/* Score Info */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                    {score.score}/{score.totalQuestions}
                  </p>
                  <LiveMenuBadge
                    variant={getRankBadgeVariant(index)}
                    size="sm"
                  >
                    {score.percentage}%
                  </LiveMenuBadge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Leaderboard Button */}
        {scores.length > 0 && (
          <div className="mt- pt-6 border-t border-secondary-200 dark:border-secondary-700">
            <LiveMenuButton
              variant="danger"
              size="sm"
              onClick={onClear}
              fullWidth
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Leaderboard
            </LiveMenuButton>
          </div>
        )}
      </div>
    </LiveMenuCard>
  );
};

