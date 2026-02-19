import type { ResourceCreateData, ResourceUpdateData } from '../types/resources'
import { HOST_ROOT, buildUpdateRequest, handleServerError } from './util'

export const requestCreateResource = async (createData: ResourceCreateData) => {
    const requestBody = JSON.stringify(createData)
    const response = await fetch(`${HOST_ROOT}/resources`, buildUpdateRequest('POST', requestBody))
    handleServerError(response, 'Error creating new resource')
    return response.json()
}

export const requestUpdateResource = async (resourceId: string, updateData: ResourceUpdateData) => {
    const requestBody = JSON.stringify(updateData)
    const response = await fetch(
        `${HOST_ROOT}/resources/${resourceId}`,
        buildUpdateRequest('PATCH', requestBody),
    )
    handleServerError(response, `Error updating resource ${resourceId}`)
    return response.json()
}
