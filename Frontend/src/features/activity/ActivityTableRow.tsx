import { TableCell } from '@mui/material'
import type { ActivityInfo } from '../../types/activities'
import { Link } from 'react-router'
import { formatDateString } from '../../utils/string-formatting'
import { StyledTableRow } from '../../styling/StyledComponents'

export const ActivityTableRow = (props: ActivityInfo) => {
    return (
        <StyledTableRow>
            <TableCell>{props.action}</TableCell>
            <TableCell>{props.resource}</TableCell>
            <TableCell>
                <Link to={`/accounts/${props.account_id}`}>{props.account_name}</Link>
            </TableCell>
            <TableCell>{props.person}</TableCell>
            <TableCell>{formatDateString(props.timestamp)}</TableCell>
        </StyledTableRow>
    )
}
