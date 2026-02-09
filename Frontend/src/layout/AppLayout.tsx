import { Outlet } from 'react-router-dom'
import { Navbar } from '../features/navigation/Navbar'
import { Box, Button } from '@mui/material'
import { useAuth } from '../features/auth/UseAuth'

export const AppLayout = () => {
    const { logout } = useAuth()

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Box sx={{ width: 240 }}>
                <Navbar />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', p: '2rem' }}>
                <Outlet />
            </Box>
            <Box sx={{ p: '2rem' }}>
                <Button variant="text" onClick={() => logout()}>
                    Logout
                </Button>
            </Box>
        </Box>
    )
}
