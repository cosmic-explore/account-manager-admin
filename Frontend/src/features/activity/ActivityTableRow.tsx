import { TableCell, TableRow } from '@mui/material'
import type { ActivityInfo } from '../../types/activities'

export const ActivityTableRow = (props: ActivityInfo) => {
    return (
        <TableRow>
            <TableCell>{props.action}</TableCell>
            <TableCell>{props.resource}</TableCell>
            <TableCell>{props.person}</TableCell>
            <TableCell>{props.timestamp}</TableCell>
        </TableRow>
    )
}
