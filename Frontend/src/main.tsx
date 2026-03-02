import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styling/index.css'
import App from './App.tsx'
import { AuthProvider } from './features/auth/AuthProvider.tsx'
import { ErrorProvider } from './features/ux-hints/ErrorProvider.tsx'
import { AppTheme } from './styling/AppTheme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={AppTheme}>
            <CssBaseline />
            <ErrorProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ErrorProvider>
        </ThemeProvider>
    </StrictMode>,
)
