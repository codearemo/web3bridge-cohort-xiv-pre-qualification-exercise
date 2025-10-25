import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LiveMenuThemeProvider, LiveMenuToastProvider, LiveMenuModalProvider } from '@codearemo/livemenu-ui'
import '@codearemo/livemenu-ui/dist/styles.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LiveMenuThemeProvider>
      <LiveMenuModalProvider>
        <LiveMenuToastProvider>
          <App />
        </LiveMenuToastProvider>
      </LiveMenuModalProvider>
    </LiveMenuThemeProvider>
  </StrictMode>,
)
