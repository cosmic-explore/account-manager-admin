import { buildGetRequest, handleServerError, HOST_ROOT } from "./util"

export const requestMe = async () => {
    return fetch(`${HOST_ROOT}/persons/me`, buildGetRequest())
}

export const requestPersons = async () => {
    const response = await fetch(`${HOST_ROOT}/persons`, buildGetRequest())
    handleServerError(response, 'Error retrieving persons')
    return response.json()
}