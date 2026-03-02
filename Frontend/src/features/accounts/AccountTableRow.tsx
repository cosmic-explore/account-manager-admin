import { TableCell } from '@mui/material'
import type { AccountInfo } from '../../types/accounts'
import { Link } from 'react-router'
import { StyledTableRow } from '../../styling/StyledComponents'

export const AccountTableRow = (props: AccountInfo) => {
    return (
        <StyledTableRow>
            <TableCell>
                <Link to={`/accounts/${props.id}`}>{props.name}</Link>
            </TableCell>
            <TableCell>{props.status}</TableCell>
        </StyledTableRow>
    )
}
