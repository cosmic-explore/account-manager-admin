export type ResourceInfo = {
    id: string,
    name: string,
    type: string,
    status: string,
    quantity: number,
    unit: string,
    account: string,
    account_id: string,
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
    unit: string,
    account_id: string
}