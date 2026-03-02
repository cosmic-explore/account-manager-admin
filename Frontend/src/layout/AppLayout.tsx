import { Outlet } from 'react-router-dom'
import { Navbar } from '../features/navigation/Navbar'
import { Box, Button } from '@mui/material'
import { useAuth } from '../features/auth/AuthProvider'

const sidebarWidth = 240

export const AppLayout = () => {
    const { logout } = useAuth()

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Navbar width={sidebarWidth} />
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
