import { TableCell } from '@mui/material'
import type { PersonInfo } from '../../types/persons'
import { StyledTableRow } from '../../styling/StyledComponents'

export const PersonTableRow = (props: PersonInfo) => {
    return (
        <StyledTableRow>
            <TableCell>{props.email}</TableCell>
            <TableCell>{props.role}</TableCell>
        </StyledTableRow>
    )
}
