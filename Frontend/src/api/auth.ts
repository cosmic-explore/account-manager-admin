import type { LoginInfo } from "../types/auth"
import { buildUpdateRequest, API_ROOT } from "./util"

export const requestLogin = async (submittedData: LoginInfo) => {
    const requestBody = JSON.stringify(submittedData)
    return await fetch(`${API_ROOT}/auth/login`, buildUpdateRequest('POST', requestBody))
}

export const requestLogout = async () => {
    return await fetch(`${API_ROOT}/auth/logout`, buildUpdateRequest('POST', ''))
}
