import { useAuth } from '../features/auth/UseAuth'

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
