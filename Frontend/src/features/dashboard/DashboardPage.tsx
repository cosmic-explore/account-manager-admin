import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { DefaultPage } from '../../layout/DefaultPage'
import { useEffect, useState } from 'react'
import { requestDashboardData } from '../../api/dashboard'
import {
    type DashboardAlerts,
    type TypeBucket,
    type DashboardSummary,
    type MonthBucket,
} from '../../types/dashboard'
import { KpiCard } from './KpiCard'
import { type ActivityInfo } from '../../types/activities'
import { ActivityLog } from '../activity/ActivityLog'
import { AdminOnlyWrapper } from '../../layout/AdminOnlyWrapper'
import { AlertZone } from './AlertZone'
import { TimeChart } from './TimeChart'
import { DistributionChart } from './DistributionChart'
import { SERVER_ERROR } from '../../constants'
import { useError } from '../ux-hints/ErrorProvider'

export const DashboardPage = () => {
    const [summary, setSummary] = useState<DashboardSummary>()
    const [accountGrowth, setAccountGrowth] = useState<MonthBucket[]>([])
    const [resourceDist, setResourceDist] = useState<TypeBucket[]>([])
    const [alerts, setAlerts] = useState<DashboardAlerts>({
        accounts_no_resources: [],
        accounts_stale_resources: [],
        resources_no_quantity: [],
    })
    const [activities, setActivities] = useState<ActivityInfo[]>([])
    const { showError } = useError()
    const hasAlerts =
        alerts.accounts_no_resources.length +
            alerts.accounts_stale_resources.length +
            alerts.resources_no_quantity.length >
        0

    useEffect(() => {
        try {
            requestDashboardData().then(dashboardData => {
                setSummary(dashboardData.summary)
                setAccountGrowth(dashboardData.account_growth)
                setResourceDist(dashboardData.resource_distribution)
                setAlerts(dashboardData.alerts)
                setActivities(dashboardData.recent_activity)
            })
        } catch {
            showError(SERVER_ERROR)
        }
    }, [])

    return (
        <DefaultPage>
            <Stack sx={{ pb: '1rem' }}>
                <Typography variant="h3">Dashboard</Typography>
                <Typography variant="body2" color="text.secondary">
                    Overview of accounts and resource usage
                </Typography>
            </Stack>
            <Stack>
                <DashboardSection>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                        <KpiCard title="Total Accounts" value={summary?.total_accounts} />
                        <KpiCard title="Active Accounts" value={summary?.active_accounts} />
                        <KpiCard title="New Accounts" value={summary?.new_accounts} />
                        <KpiCard title="Total Resources" value={summary?.total_resources} />
                        <KpiCard
                            title="Total Storage Allocated (GB)"
                            value={summary?.total_storage_allocation}
                        />
                        <KpiCard title="New Resources" value={summary?.new_resources} />
                    </Stack>
                </DashboardSection>
                {hasAlerts ? (
                    <DashboardSection>
                        <AlertZone alerts={alerts} />
                    </DashboardSection>
                ) : (
                    ''
                )}
                <DashboardSection>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                        <TimeChart title="Account Creation by Month" monthBuckets={accountGrowth} />
                        <Box sx={{ flex: 1 }} />
                        <DistributionChart
                            title="Resource Distribution by Type"
                            typeBuckets={resourceDist}
                        />
                    </Stack>
                </DashboardSection>
                <AdminOnlyWrapper>
                    <DashboardSection>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h4" sx={{ mb: '1rem' }}>
                                    Recent Activity
                                </Typography>
                                <ActivityLog activityList={activities} />
                            </CardContent>
                        </Card>
                    </DashboardSection>
                </AdminOnlyWrapper>
            </Stack>
        </DefaultPage>
    )
}

const DashboardSection = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ mb: '1.5rem' }}>{children}</Box>
}
