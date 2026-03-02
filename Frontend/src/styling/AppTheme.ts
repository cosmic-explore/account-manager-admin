import { createTheme } from '@mui/material'
import { indigo } from '@mui/material/colors'

export const AppTheme = createTheme({
    palette: {
        primary: indigo,
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
        background: {
            default: '#F9FAFB',
            paper: '#ffffff',
        },
        divider: '#d2d4d8',
    },
    typography: {
        fontFamily: ['Roboto'].join(','),
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                body: {
                    // by default table cell takes the theme divider color and makes it super light, so override that
                    borderBottom: '1px solid #d2d4d8',
                },
            },
        },
    },
})