export type AccountInfo = {
    id: string,
    name: string,
    status: string
}

export type AccountUpdateData = {
    name?: string,
    status?: string
}

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