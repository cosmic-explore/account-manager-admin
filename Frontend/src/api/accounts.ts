import type { AccountUpdateData } from "../types/accounts"
import { HOST_ROOT, buildGetRequest, buildUpdateRequest, handleServerError } from "./util"

export const requestAccounts = async () => {
    const response = await fetch(`${HOST_ROOT}/accounts`, buildGetRequest())
    handleServerError(response, 'Error retrieving accounts')
    return response.json()
}

export const requestAccountResources = async (accountId: string) => {
    const response = await fetch(`${HOST_ROOT}/accounts/${accountId}/resources`, buildGetRequest())
    handleServerError(response, `Error retrieving data for account ${accountId}`)
    return response.json()
}

export const requestCreateAccount = async (name: string, status: string) => {
    const requestBody = JSON.stringify({name, status})
    const response = await fetch(`${HOST_ROOT}/accounts`, buildUpdateRequest('POST', requestBody))
    handleServerError(response, `Error creating account`)
    return response.json()
}

export const requestUpdateAccount = async (accountId: string, updateData: AccountUpdateData) => {
    const requestBody = JSON.stringify(updateData)
    const response = await fetch(`${HOST_ROOT}/accounts/${accountId}`, buildUpdateRequest('PATCH', requestBody))
    handleServerError(response, `Error updating account ${accountId}`)
    return response.json()
}