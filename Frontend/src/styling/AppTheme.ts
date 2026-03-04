import { createTheme } from '@mui/material'
import { amber, indigo, red } from '@mui/material/colors'

export const AppTheme = createTheme({
    palette: {
        primary: {
            main: indigo[300],
            light: '#f2f4fa',
            dark: indigo[500]
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
        error: {
            main: red[400],
            light: red[50],
        },
        warning: {
            main: amber[500],
            light: amber[50],
            dark: amber[900]
        },
        background: {
            default: '#f9fafbf3',
            paper: '#ffffff',
        },
        divider: '#d2d4d8',
    },
    typography: {
        fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
    },
    shape: {
        borderRadius: 10,
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
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
})