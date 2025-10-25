import type { PlayerScore } from '../types/quiz';

const LEADERBOARD_KEY = 'quiz_leaderboard';
const MAX_LEADERBOARD_ENTRIES = 10;

/**
 * Get all scores from leaderboard
 */
export const getLeaderboard = (): PlayerScore[] => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    
    const scores: PlayerScore[] = JSON.parse(data);
    return scores.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    return [];
  }
};

/**
 * Add a new score to the leaderboard
 */
export const addToLeaderboard = (score: PlayerScore): boolean => {
  try {
    const leaderboard = getLeaderboard();
    leaderboard.push(score);
    
    // Sort by score (descending) and keep only top entries
    const sortedLeaderboard = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES);
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sortedLeaderboard));
    return true;
  } catch (error) {
    console.error('Error saving to leaderboard:', error);
    return false;
  }
};

/**
 * Check if a score qualifies for the leaderboard
 */
export const isLeaderboardScore = (score: number): boolean => {
  try {
    const leaderboard = getLeaderboard();
    
    // If leaderboard isn't full, all scores qualify
    if (leaderboard.length < MAX_LEADERBOARD_ENTRIES) {
      return true;
    }
    
    // Check if score is higher than the lowest score
    const lowestScore = leaderboard[leaderboard.length - 1].score;
    return score > lowestScore;
  } catch (error) {
    console.error('Error checking leaderboard qualification:', error);
    return true; // Default to true on error
  }
};

/**
 * Clear the entire leaderboard
 */
export const clearLeaderboard = (): void => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch (error) {
    console.error('Error clearing leaderboard:', error);
  }
};

/**
 * Calculate percentage score
 */
export const calculatePercentage = (score: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

