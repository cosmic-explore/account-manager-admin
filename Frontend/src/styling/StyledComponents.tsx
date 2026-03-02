import { TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DataGrid, gridClasses } from '@mui/x-data-grid'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.action.hover,
    },
    [`& .${gridClasses.row}`]: {
        borderBottom: '1px solid #d2d4d8',
    },
    [`& .${gridClasses.row}:last-child`]: {
        border: 0,
    },
}))
