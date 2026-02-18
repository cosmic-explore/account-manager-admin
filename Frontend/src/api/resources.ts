import { SERVER_ERROR } from '../constants'
import type { ResourceCreateData, ResourceUpdateData } from '../types/resources'
import { HOST_ROOT, buildUpdateRequest } from './util'

export const requestCreateResource = async (createData: ResourceCreateData) => {
    const requestBody = JSON.stringify(createData)
    const response = await fetch(`${HOST_ROOT}/resources`, buildUpdateRequest('POST', requestBody))
    return response.json()
}

export const requestUpdateResource = async (resourceId: string, updateData: ResourceUpdateData) => {
    const requestBody = JSON.stringify(updateData)
    const response = await fetch(
        `${HOST_ROOT}/resources/${resourceId}`,
        buildUpdateRequest('PATCH', requestBody),
    )
    if (!response.ok) {
        throw new Error(SERVER_ERROR)
    } else {
        return response.json()
    }
}
