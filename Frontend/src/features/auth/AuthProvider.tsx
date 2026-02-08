import { useEffect, useState } from 'react'
import { AuthContext, type LoginInfo, type UserStatus } from '../../types/auth'
import { requestLogin, requestLogout, requestMe } from '../../api/auth'
import { CREDENTIALS_ERROR, GENERAL_ERROR } from '../../constants'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userStatus, setUserStatus] = useState<UserStatus>({ user: null, loading: true })

    // Check auth once on app load
    useEffect(() => {
        requestMe().then(response => {
            if (!response.ok) {
                setUserStatus({ user: null, loading: false })
                throw Error(response.statusText)
            } else {
                response.json().then(user => setUserStatus({ user, loading: false }))
            }
        })
    }, [])

    const login = async (submittedData: LoginInfo) => {
        const response = await requestLogin(submittedData)
        if (response.ok) {
            const meResponse = await requestMe()
            if (meResponse.ok) {
                setUserStatus({ user: await meResponse.json(), loading: false })
            } else {
                throw new Error(GENERAL_ERROR)
            }
        } else {
            if (response.status === 401) {
                throw new Error(CREDENTIALS_ERROR)
            } else {
                throw new Error(GENERAL_ERROR)
            }
        }
    }

    const logout = async () => {
        const response = await requestLogout()
        if (!response.ok) {
            throw new Error(GENERAL_ERROR)
            // TODO: base behavior on another requestMe()
        } else {
            setUserStatus({ user: null, loading: false })
        }
    }

    return (
        <AuthContext.Provider value={{ userStatus, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
