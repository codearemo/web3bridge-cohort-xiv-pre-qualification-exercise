import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, isActive }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  // Separate effect to handle time up callback
  useEffect(() => {
    if (timeRemaining === 0 && isActive) {
      onTimeUp();
    }
  }, [timeRemaining, isActive, onTimeUp]);

  const getTimerColor = () => {
    const percentage = (timeRemaining / initialTime) * 100;
    if (percentage > 50) return 'text-success-600';
    if (percentage > 25) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getProgressColor = () => {
    const percentage = (timeRemaining / initialTime) * 100;
    if (percentage > 50) return 'bg-success-500';
    if (percentage > 25) return 'bg-warning-500';
    return 'bg-danger-500';
  };

  const progressPercentage = (timeRemaining / initialTime) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${getTimerColor()}`} />
          <span className={`text-2xl font-bold ${getTimerColor()}`}>
            {timeRemaining}s
          </span>
        </div>
        <span className="text-sm text-secondary-600 dark:text-secondary-400">
          Time Remaining
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

