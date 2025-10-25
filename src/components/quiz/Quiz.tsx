import { useState, useEffect } from 'react';
import { PlayCircle, List } from 'lucide-react';
import { LiveMenuButton, LiveMenuCard, LiveMenuAlert, useToast } from '@codearemo/livemenu-ui';
import type { Question as QuestionType, PlayerScore } from '../../types/quiz';
import { Question } from './Question';
import { QuizResult } from './QuizResult';
import { ScoreDisplay } from './ScoreDisplay';
import { Leaderboard } from './Leaderboard';
import {
  getLeaderboard,
  addToLeaderboard,
  clearLeaderboard as clearLeaderboardStorage,
} from '../../utils/storage';
import questionsData from '../../data/questions.json';

type GameState = 'welcome' | 'playing' | 'result';

export const Quiz: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Load questions and leaderboard on mount
  useEffect(() => {
    try {
      if (!questionsData.questions || questionsData.questions.length === 0) {
        setError('No questions available. Please check the questions data.');
        return;
      }
      const loadedQuestions = questionsData.questions as QuestionType[];
      setAllQuestions(loadedQuestions);
      setQuestions(loadedQuestions); // Initially show all questions count
      setLeaderboard(getLeaderboard());
    } catch (err) {
      setError('Failed to load quiz data. Please refresh the page.');
      console.error('Error loading quiz data:', err);
    }
  }, []);

  const getRandomQuestions = (allQuestions: QuestionType[], count: number): QuestionType[] => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const startQuiz = () => {
    if (allQuestions.length === 0) {
      showToast('No questions available to start the quiz.', { variant: 'error' });
      return;
    }

    // Get 10 random questions for this session
    const sessionQuestions = getRandomQuestions(allQuestions, 10);
    setQuestions(sessionQuestions);

    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setError(null);

    showToast(`Starting quiz with ${sessionQuestions.length} random questions!`, { variant: 'success' });
  };

  const handleSelectAnswer = (answerId: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answers.find((a) => a.isCorrect);

    if (selectedAnswer === correctAnswer?.id) {
      setScore((prev) => prev + 1);
      showToast('Correct! 🎉', { variant: 'success' });
    } else {
      showToast('Incorrect. Try the next one!', { variant: 'error' });
    }

    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameState('result');
    }
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      showToast('Time\'s up! ⏰', { variant: 'error' });
      setIsAnswered(true);
    }
  };

  const handleSaveScore = (playerScore: PlayerScore) => {
    const success = addToLeaderboard(playerScore);
    if (success) {
      setLeaderboard(getLeaderboard());
      showToast('Score saved to leaderboard! 🏆', { variant: 'success' });
    } else {
      showToast('Failed to save score. Please try again.', { variant: 'error' });
    }
  };

  const handleClearLeaderboard = () => {
    clearLeaderboardStorage();
    setLeaderboard([]);
    showToast('Leaderboard cleared!', { variant: 'success' });
  };

  const handleRestart = () => {
    // Get fresh random questions for the new session
    const sessionQuestions = getRandomQuestions(allQuestions, 10);
    setQuestions(sessionQuestions);

    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setError(null);

    showToast(`New quiz session with ${sessionQuestions.length} random questions!`, { variant: 'success' });
  };

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <LiveMenuAlert variant="danger" title="Error">
          {error}
        </LiveMenuAlert>
      </div>
    );
  }

  // Welcome screen
  if (gameState === 'welcome') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            Quiz Master
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-2">
            Test your knowledge across multiple categories!
          </p>
          <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold">
            Each quiz session contains 10 random questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <LiveMenuCard className="h-full mt-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                Start Playing
              </h2>
              <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                Challenge yourself with 10 randomly selected questions from our pool of {allQuestions.length} questions covering various topics including:
              </p>
              <ul className="text-secondary-600 dark:text-secondary-400 mb-6">
                <li className="mb-3">✅ Geography & Science</li>
                <li className="mb-3">✅ History & Literature</li>
                <li className="mb-3">✅ Technology & Mathematics</li>
                <li className="mb-3">✅ Art & General Knowledge</li>
              </ul>
              <div className="pt-6">
                <LiveMenuButton
                  variant="primary"
                  size="lg"
                  onClick={startQuiz}
                  fullWidth
                  disabled={questions.length === 0}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Quiz
                </LiveMenuButton>
              </div>
            </div>
          </LiveMenuCard>

          <LiveMenuCard className="h-full mt-4">
            <div className="text-secondary-700 dark:text-secondary-300 p-6">
              <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                How to Play
              </h2>
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  1
                </span>
                <p>Read each question carefully and select your answer</p>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  2
                </span>
                <p>Beat the timer! Each question has a time limit</p>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  3
                </span>
                <p>Get instant feedback on your answers</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  4
                </span>
                <p>Aim for a high score and make it to the leaderboard!</p>
              </div>
            </div>
          </LiveMenuCard>
        </div>

        {/* Leaderboard Toggle */}
        <div className="text-center pt-4 mb-6 mt-4">
          <LiveMenuButton
            variant="outline"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            <List className="w-5 h-5 mr-2" />
            {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
          </LiveMenuButton>
        </div>

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="max-w-2xl mx-auto pt-6">
            <Leaderboard scores={leaderboard} onClear={handleClearLeaderboard} />
          </div>
        )}
      </div>
    );
  }

  // Playing state
  if (gameState === 'playing') {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
      return (
        <div className="max-w-4xl mx-auto p-6">
          <LiveMenuAlert variant="danger" title="Error">
            Question data is missing. Please restart the quiz.
          </LiveMenuAlert>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-6 mt-4">
        {/* Header */}
        <div className="text-center pb-4 mb-8">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            Quiz Master
          </h1>
        </div>

        {/* Score Display */}
        <div className="mb-8">
          <ScoreDisplay
            currentScore={score}
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex + 1}
          />
        </div>

        {/* Question Card */}
        <div className="mb-8">
          <LiveMenuCard>
            <Question
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              onSelectAnswer={handleSelectAnswer}
              onTimeUp={handleTimeUp}
            />
          </LiveMenuCard>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          {!isAnswered && (
            <LiveMenuButton
              variant="primary"
              size="lg"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="min-w-[200px]"
            >
              Submit Answer
            </LiveMenuButton>
          )}

          {isAnswered && (
            <LiveMenuButton
              variant="primary"
              size="lg"
              onClick={handleNextQuestion}
              className="min-w-[200px]"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            </LiveMenuButton>
          )}
        </div>
      </div>
    );
  }

  // Result state
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onSaveScore={handleSaveScore}
        />
      </div>

      <div className="max-w-2xl mx-auto pt-4">
        <Leaderboard scores={leaderboard} onClear={handleClearLeaderboard} />
      </div>
    </div>
  );
};

