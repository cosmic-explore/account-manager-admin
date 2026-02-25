import { useAuth } from '../features/auth/AuthProvider'

export const AdminOnlyWrapper = ({ children }: { children: React.ReactNode }) => {
    const {
        userStatus: { user },
    } = useAuth()

    if (user?.role === 'admin') {
        return children
    } else {
        return ''
    }
}
