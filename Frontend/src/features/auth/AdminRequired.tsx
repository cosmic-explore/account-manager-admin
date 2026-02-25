import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export const AdminRequired = () => {
    const { userStatus } = useAuth()

    if (userStatus.loading) {
        return
    }

    if (!(userStatus.user?.role == 'admin')) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
