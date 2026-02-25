import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './features/auth/AuthProvider.tsx'
import { ErrorProvider } from './features/ux-hints/ErrorProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ErrorProvider>
    </StrictMode>,
)
