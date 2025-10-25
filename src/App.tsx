import { LiveMenuThemeToggle } from '@codearemo/livemenu-ui';
import { Quiz } from './components/quiz/Quiz';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <LiveMenuThemeToggle />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Quiz />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-secondary-600 dark:text-secondary-400 text-sm">
        <p>Made with ❤️ by <a href="https://github.com/codearemo" target="_blank" rel="noopener noreferrer">CodeAremo</a></p>
      </footer>
    </div>
  );
}

export default App;
