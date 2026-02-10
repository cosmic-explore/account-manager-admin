import type { AccountUpdateData } from "../types/accounts"
import { HOST_ROOT, buildGetRequest, buildPostRequest, buildPutRequest } from "./util"

export const requestAccounts = async () => {
    const response = await fetch(`${HOST_ROOT}/accounts`, buildGetRequest())
    return response.json()
}

export const requestAccountResources = async (accountId: string) => {
    const response = await fetch(`${HOST_ROOT}/accounts/${accountId}/resources`, buildGetRequest())
    return response.json()
}

export const requestCreateAccount = async (name: string, status: string) => {
    const requestBody = JSON.stringify({name, status})
    const response = await fetch(`${HOST_ROOT}/accounts`, buildPostRequest(requestBody))
    return response.json()
}

export const requestUpdateAccount = async (accountId: string, updateData: AccountUpdateData) => {
    const requestBody = JSON.stringify(updateData)
    const response = await fetch(`${HOST_ROOT}/accounts/${accountId}`, buildPutRequest(requestBody))
    return response.json()
}