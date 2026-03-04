import { Card, CardContent, Typography } from '@mui/material'

export const KpiCard = (props: { title: string; value: number | undefined }) => {
    return (
        <Card elevation={3} sx={{ backgroundColor: 'primary.light' }}>
            <CardContent>
                <Typography variant="button">{props.title}</Typography>
                <Typography fontSize="3rem">{props.value}</Typography>
            </CardContent>
        </Card>
    )
}
