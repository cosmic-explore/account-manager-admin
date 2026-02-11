import { Box, ListItemButton, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/UseAuth'

export const Navbar = () => {
    const {
        userStatus: { user },
    } = useAuth()

    return (
        <Box sx={{ p: '2rem' }}>
            <nav>
                <ListItemButton component={NavLink} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/accounts">
                    <ListItemText primary="Accounts" />
                </ListItemButton>
                {user?.role === 'admin' ? (
                    <>
                        <ListItemButton component={NavLink} to="/users">
                            <ListItemText primary="Users" />
                        </ListItemButton>
                        <ListItemButton component={NavLink} to="/activitylog">
                            <ListItemText primary="Activity Log" />
                        </ListItemButton>
                    </>
                ) : (
                    ''
                )}
            </nav>
        </Box>
    )
}
