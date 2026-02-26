import type { AccountInfo } from "./accounts"
import type { ResourceInfo } from "./resources"

export type DashboardSummary = {
    total_accounts: number,
    active_accounts: number,
    new_accounts: number
    total_resources: number,
    total_storage_allocation: number,
    new_resources: number
}

export type MonthBucket = {
    count: number,
    month: number,
    year: number
}

export type TypeBucket = {
    count: number,
    type: string
}

export type DashboardAlerts = {
    accounts_no_resources: AccountInfo[],
    accounts_stale_resources: AccountInfo[],
    resources_no_quantity: ResourceInfo[]
}