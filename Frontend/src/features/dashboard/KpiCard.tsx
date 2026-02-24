import { Card, CardContent, Typography } from '@mui/material'

export const KpiCard = (props: { title: string; value: number | undefined }) => {
    return (
        <Card>
            <CardContent>
                <Typography>{props.title}</Typography>
                <Typography>{props.value}</Typography>
            </CardContent>
        </Card>
    )
}
