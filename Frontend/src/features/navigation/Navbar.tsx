import { Drawer, Box, ListItemButton, ListItemText } from '@mui/material'
import {
    DashboardOutlined,
    PeopleAltOutlined,
    ListOutlined,
    HandshakeOutlined,
} from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'
import { AdminOnlyWrapper } from '../../layout/AdminOnlyWrapper'

export const Navbar = (props: { width: number }) => {
    const location = useLocation()

    const isLocation = (path: string) => {
        return path == location.pathname
    }

    return (
        <Drawer
            sx={{
                width: props.width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{ pb: '1rem' }} />
            <nav>
                <ListItemButton
                    component={NavLink}
                    to="/dashboard"
                    selected={isLocation('/dashboard')}
                >
                    <DashboardOutlined sx={{ mr: '1rem' }} />
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                    component={NavLink}
                    to="/accounts"
                    selected={isLocation('/accounts')}
                >
                    <HandshakeOutlined sx={{ mr: '1rem' }} />
                    <ListItemText primary="Accounts" />
                </ListItemButton>
                <AdminOnlyWrapper>
                    <ListItemButton component={NavLink} to="/users" selected={isLocation('/users')}>
                        <PeopleAltOutlined sx={{ mr: '1rem' }} />
                        <ListItemText primary="Users" />
                    </ListItemButton>
                    <ListItemButton
                        component={NavLink}
                        to="/activitylog"
                        selected={isLocation('/activitylog')}
                    >
                        <ListOutlined sx={{ mr: '1rem' }} />
                        <ListItemText primary="Activity Log" />
                    </ListItemButton>
                </AdminOnlyWrapper>
            </nav>
        </Drawer>
    )
}
