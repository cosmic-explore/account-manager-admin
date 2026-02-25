import { Typography } from '@mui/material'
import { DefaultPage } from '../../layout/DefaultPage'
import { ActivityLog } from './ActivityLog'
import { useEffect, useState } from 'react'
import type { ActivityInfo } from '../../types/activities'
import { requestActivities } from '../../api/activities'
import { SERVER_ERROR } from '../../constants'
import { useError } from '../ux-hints/ErrorProvider'

export const ActivitiesPage = () => {
    const [activityList, setActivityList] = useState<ActivityInfo[]>([])
    const { showError } = useError()

    useEffect(() => {
        try {
            requestActivities().then(response => {
                const activities = response as ActivityInfo[]
                activities.sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1))
                setActivityList(activities)
            })
        } catch {
            showError(SERVER_ERROR)
        }
    }, [])

    return (
        <DefaultPage>
            <Typography variant="h4" sx={{ pb: '1rem' }}>
                Platform Activity
            </Typography>
            <ActivityLog activityList={activityList} />
        </DefaultPage>
    )
}
