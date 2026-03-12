import { buildUpdateRequest, API_ROOT } from "./util"

export const resetApp = async () => {
    return await fetch(`${API_ROOT}/demo/reset`, buildUpdateRequest('POST', ''))
}