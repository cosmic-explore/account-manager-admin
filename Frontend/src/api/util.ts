export const HOST_ROOT = `${import.meta.env.VITE_HOST_ROOT}`

export const buildGetRequest = (): RequestInit => {
    return {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'include'
    }
}

export const buildPostRequest = (body: string): RequestInit => {
    return {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body,
        credentials: 'include'
    }
}

export const buildPutRequest = (body: string): RequestInit => {
    return {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body,
        credentials: 'include'
    }
}