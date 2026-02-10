import { TableCell, TableRow } from '@mui/material'
import type { AccountInfo } from '../../types/accounts'
import { Link } from 'react-router'

export const AccountTableRow = (props: AccountInfo) => {
    return (
        <TableRow>
            <TableCell>
                <Link to={`/accounts/${props.id}}`}>{props.name}</Link>
            </TableCell>
            <TableCell>{props.status}</TableCell>
        </TableRow>
    )
}
