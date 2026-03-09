import {
    Drawer,
    Box,
    ListItemButton,
    ListItemText,
    Alert,
    AlertTitle,
    Typography,
    Button,
} from '@mui/material'
import {
    DashboardOutlined,
    PeopleAltOutlined,
    ListOutlined,
    HandshakeOutlined,
} from '@mui/icons-material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AdminOnlyWrapper } from '../../layout/AdminOnlyWrapper'
import { resetApp } from '../../api/demo'

export const Navbar = (props: { width: number }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const isLocation = (path: string) => {
        return path == location.pathname
    }

    const handleResetAppClick = () => {
        if (confirm('Are you sure you want to reset the demo?')) {
            resetApp().then(() => {
                navigate('/')
            })
        }
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
            <Alert severity="info" sx={{ mt: '2rem', textAlign: 'left' }}>
                <AlertTitle>How to use the app</AlertTitle>
                <Typography variant="body1" sx={{ mb: '.5rem' }}>
                    From the dashboard, you have a view of system metrics, as well as pending
                    alerts. By updating resources, you can resolve the alerts to remove the
                    <strong> Needs Attention </strong> section from the dashboard.
                </Typography>
                <Typography variant="body1" sx={{ mb: '.5rem' }}>
                    If you want a clean slate, you can reset the app to its original state with the
                    button below. This will clear user activity and restore the original alerts.
                </Typography>
                <Button variant="contained" onClick={handleResetAppClick}>
                    Reset App
                </Button>
            </Alert>
        </Drawer>
    )
}
