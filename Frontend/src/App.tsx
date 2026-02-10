import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginPage } from './features/auth/LoginPage'
import { createTheme } from '@mui/material'
import { LoginRequired } from './features/auth/LoginRequired'
import { AppLayout } from './layout/AppLayout'
import { AccountsPage } from './features/accounts/AccountsPage'
import { AccountDetailPage } from './features/accounts/AccountDetailPage'

const theme = createTheme()
theme.spacing(2)

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LoginPage />} />
                <Route path={'/login'} element={<LoginPage />} />
                <Route element={<LoginRequired />}>
                    <Route element={<AppLayout />}>
                        <Route path={'/dashboard'} element={<div>Dashboard</div>} />
                        <Route path={'/accounts'} element={<AccountsPage />} />
                        <Route path={'/accounts/:id'} element={<AccountDetailPage />} />
                        <Route path={'/users'} element={<div />} />
                        <Route path={'/activitylog'} element={<div />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
