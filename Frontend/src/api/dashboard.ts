import { buildGetRequest, handleServerError, HOST_ROOT } from "./util"


export const requestDashboardData = async () => {
    const response = await fetch(`${HOST_ROOT}/dashboard`, buildGetRequest())
    handleServerError(response, `Error retrieving dashboard data`)
    return response.json()
}