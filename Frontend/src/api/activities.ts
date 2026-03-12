import { buildGetRequest, handleServerError, API_ROOT } from "./util"

export const requestActivities = async () => {
    const response = await fetch(`${API_ROOT}/activities`, buildGetRequest())
    handleServerError(response, `Error retrieving activities`)
    return response.json()
}