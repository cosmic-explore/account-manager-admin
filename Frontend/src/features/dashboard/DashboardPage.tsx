import { Box, Typography } from '@mui/material'
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
            <Typography variant="h4" sx={{ pb: '1rem' }}>
                Dashboard
            </Typography>
            <Box>
                <DashboardSection>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <KpiCard title="Total Accounts" value={summary?.total_accounts} />
                        <KpiCard title="Active Accounts" value={summary?.active_accounts} />
                        <KpiCard title="New Accounts" value={summary?.new_accounts} />
                        <KpiCard title="Total Resources" value={summary?.total_resources} />
                        <KpiCard
                            title="Total Resource Quantity"
                            value={summary?.total_resource_quantity}
                        />
                        <KpiCard title="New Resources" value={summary?.new_resources} />
                    </Box>
                </DashboardSection>
                <DashboardSection>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TimeChart title="Account Growth by Month" monthBuckets={accountGrowth} />
                        <DistributionChart
                            title="Resource Distribution By Type"
                            typeBuckets={resourceDist}
                        />
                    </Box>
                </DashboardSection>
                <DashboardSection>
                    <AlertZone alerts={alerts} />
                </DashboardSection>
                <AdminOnlyWrapper>
                    <DashboardSection>
                        <Typography variant="h5">Recent Activity</Typography>
                        <ActivityLog activityList={activities} />
                    </DashboardSection>
                </AdminOnlyWrapper>
            </Box>
        </DefaultPage>
    )
}

const DashboardSection = ({ children }: { children: React.ReactNode }) => {
    return <Box sx={{ mb: '1rem' }}>{children}</Box>
}
