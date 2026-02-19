import { SERVER_ERROR } from "../constants"

export const HOST_ROOT = `${import.meta.env.VITE_HOST_ROOT}`

export const buildGetRequest = (): RequestInit => {
    return {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
        credentials: 'include'
    }
}

export const buildUpdateRequest = (method: string, body: string): RequestInit => {
    const requestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: method,
        body,
        credentials: 'include'
    }
    return requestConfig as RequestInit
}

export const handleServerError = (response: Response, message: string) => {
    if (!response.ok) {
        throw new Error(`${SERVER_ERROR}\n${message}: code ${response.status}`)
    }
}