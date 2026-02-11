import { buildGetRequest, HOST_ROOT } from "./util"

export const requestMe = async () => {
    return fetch(`${HOST_ROOT}/persons/me`, buildGetRequest())
}
