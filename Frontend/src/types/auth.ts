import { createContext } from "react"

export type LoginInfo = {
    email: string
    password: string
}

export type UserInfo = {
    email: string
    role: string
}

export type UserStatus = {
    user: UserInfo | null,
    loading: boolean
}

export type AuthContextType =  {
    userStatus: UserStatus
    login: (submittedData: LoginInfo) => Promise<void>;
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)
