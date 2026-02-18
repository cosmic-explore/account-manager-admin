export type ResourceInfo = {
    id: string,
    name: string,
    type: string,
    status: string,
    quantity: number,
    account: string,
    created: string,
    modified: string
}

export type ResourceUpdateData = {
    name?: string,
    type?: string,
    status: string,
    quantity?: number
}

export type ResourceCreateData = {
    name: string,
    type: string,
    status: string,
    quantity: number,
    accountId: string
}