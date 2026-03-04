import { Card, CardContent, Typography, type SxProps, type Theme } from '@mui/material'
import type { TypeBucket } from '../../types/dashboard'
import { PieChart } from '@mui/x-charts'

export const DistributionChart = (props: {
    title: string
    typeBuckets: TypeBucket[]
    sx: SxProps<Theme>
}) => {
    const chartData = props.typeBuckets.map(bucket => {
        return { label: bucket.type, value: bucket.count }
    })

    // style it as a donut chart
    return (
        <Card elevation={3} sx={props.sx}>
            <CardContent sx={{ height: '100%' }}>
                <Typography sx={{ mb: '1rem' }} fontWeight="bold">
                    {props.title}
                </Typography>
                <PieChart
                    series={[
                        { innerRadius: 50, outerRadius: 100, data: chartData, arcLabel: 'value' },
                    ]}
                />
            </CardContent>
        </Card>
    )
}
