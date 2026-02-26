import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import type { ActivityInfo } from '../../types/activities'
import { ActivityTableRow } from './ActivityTableRow'

export const ActivityLog = (props: { activityList: ActivityInfo[] }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Resource</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Timestamp</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.activityList.map(activity => (
                    <ActivityTableRow key={activity.id} {...activity} />
                ))}
            </TableBody>
        </Table>
    )
}
