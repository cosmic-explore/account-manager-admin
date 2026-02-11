import { TableRow, TableCell } from '@mui/material'
import type { PersonInfo } from '../../types/persons'

export const PersonTableRow = (props: PersonInfo) => {
    return (
        <TableRow>
            <TableCell>{props.email}</TableCell>
            <TableCell>{props.role}</TableCell>
        </TableRow>
    )
}
