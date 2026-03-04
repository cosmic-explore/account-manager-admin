import { Card, CardContent, Typography } from '@mui/material'
import type { TypeBucket } from '../../types/dashboard'
import { PieChart } from '@mui/x-charts'

export const DistributionChart = (props: { title: string; typeBuckets: TypeBucket[] }) => {
    const chartData = props.typeBuckets.map(bucket => {
        return { label: bucket.type, value: bucket.count }
    })

    const settings = {
        width: 400,
        height: 400,
    }

    // style it as a donut chart
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography sx={{ mb: '1rem' }} fontWeight="bold">
                    {props.title}
                </Typography>
                <PieChart
                    series={[
                        { innerRadius: 50, outerRadius: 100, data: chartData, arcLabel: 'value' },
                    ]}
                    {...settings}
                />
            </CardContent>
        </Card>
    )
}
