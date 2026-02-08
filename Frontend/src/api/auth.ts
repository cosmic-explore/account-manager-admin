import type { LoginInfo } from "../types/auth"
import { buildGetRequest, buildPostRequest, HOST_ROOT } from "./config"

export const requestLogin = async (submittedData: LoginInfo) => {
    const requestBody = JSON.stringify(submittedData)
    return await fetch(`${HOST_ROOT}/auth/login`, buildPostRequest(requestBody))
}

export const requestLogout = async () => {
    return await fetch(`${HOST_ROOT}/auth/logout`, buildPostRequest(''))
}

export const requestMe = async () => {
    return fetch(`${HOST_ROOT}/auth/me`, buildGetRequest())
}