import { buildGetRequest, HOST_ROOT } from "./util"

export const requestActivities = async () => {
    const response = await fetch(`${HOST_ROOT}/activities`, buildGetRequest())
    return response.json()
}