import { buildUpdateRequest, HOST_ROOT } from "./util"

export const resetApp = async () => {
    return await fetch(`${HOST_ROOT}/demo/reset`, buildUpdateRequest('POST', ''))
}