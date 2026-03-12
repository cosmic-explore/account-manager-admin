import { buildGetRequest, handleServerError, API_ROOT } from "./util"


export const requestDashboardData = async () => {
    const response = await fetch(`${API_ROOT}/dashboard`, buildGetRequest())
    handleServerError(response, `Error retrieving dashboard data`)
    return response.json()
}
