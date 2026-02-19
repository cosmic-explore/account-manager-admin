import { buildGetRequest, handleServerError, HOST_ROOT } from "./util"

export const requestActivities = async () => {
    const response = await fetch(`${HOST_ROOT}/activities`, buildGetRequest())
    handleServerError(response, `Error retrieving activities`)
    return response.json()
}