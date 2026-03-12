import { buildGetRequest, handleServerError, API_ROOT } from "./util"

export const requestMe = async () => {
    const response = await fetch(`${API_ROOT}/persons/me`, buildGetRequest())
    // don't need to throw an error if the user is just not authenticated
    if (!(response.status === 401)) {
        handleServerError(response, 'Error retrieving uesr data')
    }
    return response
}

export const requestPersons = async () => {
    const response = await fetch(`${API_ROOT}/persons`, buildGetRequest())
    handleServerError(response, 'Error retrieving persons')
    return response.json()
}