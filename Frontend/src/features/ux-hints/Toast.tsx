import { Alert, Snackbar, type AlertColor } from '@mui/material'

export const Toast = (props: {
    open: boolean
    setOpen: (open: boolean) => void
    message: string
    type?: AlertColor
}) => {
    return (
        <Snackbar
            open={props.open}
            onClose={() => props.setOpen(false)}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={() => props.setOpen(false)} severity={props.type ? props.type : 'info'}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}
