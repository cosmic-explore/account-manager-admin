import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import type { ActivityInfo } from '../../types/activities'
import { ActivityTableRow } from './ActivityTableRow'
import { useEffect, useState } from 'react'
import { requestActivities } from '../../api/activities'

export const ActivityLog = () => {
    const [activityList, setActivityList] = useState<ActivityInfo[]>([])

    useEffect(() => {
        requestActivities().then(response => {
            const activities = response as ActivityInfo[]
            activities.sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1))
            setActivityList(activities)
        })
    }, [])

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Resource</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Timestamp</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {activityList.map(activity => (
                    <ActivityTableRow key={activity.id} {...activity} />
                ))}
            </TableBody>
        </Table>
    )
}
