import { Typography } from '@mui/material'
import { DefaultPage } from '../../layout/DefaultPage'
import { ActivityLog } from './ActivityLog'

export const ActivitiesPage = () => {
    return (
        <DefaultPage>
            <Typography variant="h4" sx={{ pb: '1rem' }}>
                System Activity
            </Typography>
            <ActivityLog />
        </DefaultPage>
    )
}
