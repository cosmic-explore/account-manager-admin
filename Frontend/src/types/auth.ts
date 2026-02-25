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
