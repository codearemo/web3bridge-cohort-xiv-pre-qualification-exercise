# 🎯 Quiz Master - Dynamic Quiz Game

A modern, interactive quiz game built with React, TypeScript, Vite, and the LiveMenu UI component library. Test your knowledge across multiple categories with timed questions, instant feedback, and a competitive leaderboard!

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

### Core Features
- **📚 15 Diverse Questions** - Covering Geography, Science, History, Literature, Technology, Mathematics, and more
- **⏱️ Timed Challenges** - Each question has a time limit based on difficulty level
- **✅ Instant Feedback** - Get immediate visual feedback on your answers
- **🎨 Beautiful UI** - Modern, responsive design using LiveMenu UI components
- **🌓 Dark Mode Support** - Seamless light/dark theme switching
- **📊 Real-time Score Tracking** - See your progress throughout the quiz
- **🏆 Leaderboard System** - Track and display top 10 high scores
- **💾 Persistent Storage** - Scores saved to localStorage
- **🎯 Difficulty Indicators** - Questions categorized as Easy, Medium, or Hard
- **📱 Fully Responsive** - Works perfectly on all device sizes

### User Experience
- **Smooth Animations** - Polished transitions and visual effects
- **Error Handling** - Graceful error management for missing or invalid data
- **Accessibility** - Semantic HTML and ARIA attributes
- **Toast Notifications** - Success and error messages with LiveMenu UI toasts
- **Progress Indicators** - Visual progress bars for questions and timer
- **Category Badges** - Color-coded badges for question categories

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web3bridge-cohort-xiv-pre-qualification-exercise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5200`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Play

1. **Start the Quiz** - Click the "Start Quiz" button on the welcome screen
2. **Read the Question** - Each question displays with a category badge and difficulty level
3. **Beat the Timer** - Select your answer before time runs out
4. **Submit Answer** - Click "Submit Answer" to check if you're correct
5. **Get Feedback** - Instant visual feedback shows correct/incorrect answers
6. **Progress Through** - Continue through all questions
7. **View Results** - See your final score and performance metrics
8. **Save Your Score** - High scores can be saved to the leaderboard
9. **Challenge Again** - Play again to beat your previous score!

## 📁 Project Structure

```
src/
├── components/
│   └── quiz/
│       ├── Quiz.tsx              # Main quiz container with game logic
│       ├── Question.tsx          # Question display component
│       ├── AnswerOption.tsx      # Individual answer option
│       ├── Timer.tsx             # Countdown timer with visual progress
│       ├── ScoreDisplay.tsx      # Real-time score tracker
│       ├── QuizResult.tsx        # Final results screen
│       └── Leaderboard.tsx       # High scores display
├── data/
│   └── questions.json            # Quiz questions database
├── types/
│   └── quiz.ts                   # TypeScript type definitions
├── utils/
│   └── storage.ts                # localStorage utility functions
├── App.tsx                       # Main app component
├── main.tsx                      # App entry point with providers
├── index.css                     # Global styles with Tailwind
└── App.css                       # Component-specific styles
```

## 🎨 Component Architecture

### Quiz.tsx (Main Container)
- Manages game state (welcome, playing, result)
- Handles question navigation
- Processes answer submissions
- Manages leaderboard data
- Error handling and data validation

### Question.tsx
- Displays current question with metadata
- Shows timer and progress bar
- Renders answer options
- Handles answer selection

### AnswerOption.tsx
- Individual answer button
- Visual feedback for correct/incorrect
- Disabled state after answering

### Timer.tsx
- Countdown timer with color-coded urgency
- Progress bar visualization
- Auto-submit when time expires

### ScoreDisplay.tsx
- Real-time score tracking
- Progress through quiz
- Accuracy percentage

### QuizResult.tsx
- Final score display
- Performance message based on accuracy
- Save to leaderboard option
- Play again functionality

### Leaderboard.tsx
- Top 10 scores display
- Medal icons for top 3
- Clear leaderboard option
- Date/time formatting

## 🗃️ Data Structure

### Question Format
```typescript
{
  "id": "q1",
  "question": "What is the capital of France?",
  "category": "Geography",
  "difficulty": "easy",
  "timeLimit": 15,
  "answers": [
    { "id": "a1", "text": "London", "isCorrect": false },
    { "id": "a2", "text": "Paris", "isCorrect": true },
    { "id": "a3", "text": "Berlin", "isCorrect": false },
    { "id": "a4", "text": "Madrid", "isCorrect": false }
  ]
}
```

### Player Score Format
```typescript
{
  "name": "Player Name",
  "score": 12,
  "totalQuestions": 15,
  "percentage": 80,
  "date": "2025-10-25T10:30:00.000Z"
}
```

## 🛠️ Technologies Used

### Core Technologies
- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework

### UI Library
- **@codearemo/livemenu-ui** - Comprehensive React component library
  - LiveMenuButton - Multiple variants and sizes
  - LiveMenuCard - Content containers
  - LiveMenuInput - Form inputs
  - LiveMenuBadge - Status indicators
  - LiveMenuAlert - Error/info messages
  - LiveMenuThemeProvider - Dark mode support
  - LiveMenuToastProvider - Toast notifications
  - LiveMenuThemeToggle - Theme switcher

### Additional Libraries
- **lucide-react** - Beautiful icon set
- **@reduxjs/toolkit** - State management (if needed)
- **react-redux** - Redux bindings

## 🎨 Customization

### Adding Questions
Edit `src/data/questions.json` to add or modify questions:
```json
{
  "questions": [
    {
      "id": "unique-id",
      "question": "Your question here?",
      "category": "Category Name",
      "difficulty": "easy|medium|hard",
      "timeLimit": 15,
      "answers": [
        { "id": "a1", "text": "Option 1", "isCorrect": false },
        { "id": "a2", "text": "Option 2", "isCorrect": true }
      ]
    }
  ]
}
```

### Customizing Colors
The app uses the LiveMenu UI color palette defined in `tailwind.config.js`:
- Primary (Orange): `#ff7c30`
- Success (Green): For correct answers
- Danger (Red): For incorrect answers
- Warning (Amber): For time warnings
- Info (Blue): For information

### Adjusting Difficulty
- **Easy**: 15 seconds per question
- **Medium**: 20 seconds per question
- **Hard**: 25 seconds per question

Modify these in `questions.json` for each question.

### Leaderboard Settings
Edit `src/utils/storage.ts` to change:
```typescript
const MAX_LEADERBOARD_ENTRIES = 10; // Change to desired number
```

## 🔧 Configuration Files

### tailwind.config.js
- Theme configuration
- Color palette
- Content paths
- Dark mode settings
- Safelist patterns for dynamic classes

### vite.config.ts
- Server port (5200)
- Host settings
- Build optimizations

### tsconfig.json
- TypeScript compiler options
- Module resolution
- Path aliases

## 🎯 Key Features Explained

### Timer System
- Each question has a custom time limit
- Color-coded urgency (green → yellow → red)
- Animated progress bar
- Auto-submit when time expires

### Scoring System
- 1 point per correct answer
- No penalty for incorrect answers
- Percentage calculation
- Performance message based on score

### Leaderboard Logic
- Stores top 10 scores
- Sorted by score (descending)
- Persistent in localStorage
- Only high scores can be saved

### Error Handling
- Graceful handling of missing questions
- Invalid data detection
- User-friendly error messages
- Fallback states for edge cases

## 🚀 Performance Optimizations

- **Code Splitting** - Components loaded as needed
- **Lazy Loading** - Images and assets optimized
- **Memoization** - React hooks prevent unnecessary re-renders
- **Efficient State Management** - Minimal re-renders
- **Tailwind Purging** - Unused CSS removed in production

## 📱 Responsive Design

- **Mobile First** - Optimized for small screens
- **Tablet Friendly** - Adapts to medium screens
- **Desktop Enhanced** - Takes advantage of larger displays
- **Touch Friendly** - Large tap targets for mobile

## 🌓 Dark Mode

- System preference detection
- Manual toggle available
- Persistent theme preference
- Smooth transitions between themes

## 🔐 Data Persistence

- Leaderboard stored in localStorage
- Theme preference saved
- Data survives page refreshes
- Easy to clear via UI

## 🐛 Troubleshooting

### Questions not loading?
- Check `src/data/questions.json` exists
- Verify JSON is valid
- Check browser console for errors

### Styles not working?
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` content paths
- Verify LiveMenu UI stylesheet is imported

### Dark mode not working?
- Ensure `LiveMenuThemeProvider` wraps the app
- Check `tailwind.config.js` has `darkMode: 'class'`

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **LiveMenu UI** - Component library by @codearemo
- **Lucide** - Beautiful icon set
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

Made with ❤️ using React + TypeScript + Vite + LiveMenu UI
