import { Outlet } from 'react-router-dom'
import { Navbar } from '../features/navigation/Navbar'
import { Box } from '@mui/material'

export const AppLayout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Box sx={{ width: 240 }}>
                <Navbar />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', p: '2rem' }}>
                <Outlet />
            </Box>
        </Box>
    )
}
