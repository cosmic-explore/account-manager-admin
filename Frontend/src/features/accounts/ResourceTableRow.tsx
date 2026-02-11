import { TableCell, TableRow } from '@mui/material'
import type { ResourceInfo } from '../../types/accounts'

export const ResourceTableRow = (props: ResourceInfo) => {
    return (
        <TableRow key={props.id}>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.type}</TableCell>
            <TableCell>{props.status}</TableCell>
            <TableCell>{props.quantity}</TableCell>
            <TableCell>{props.created}</TableCell>
            <TableCell>{props.modified}</TableCell>
        </TableRow>
    )
}
