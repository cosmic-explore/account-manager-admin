import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './UseAuth'

export const LoginRequired = () => {
    const { userStatus } = useAuth()

    if (userStatus.loading) {
        return
    }

    if (!userStatus.user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
