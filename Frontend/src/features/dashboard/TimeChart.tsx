import { Card, CardContent, Typography } from '@mui/material'
import type { MonthBucket } from '../../types/dashboard'
import { BarChart } from '@mui/x-charts'

export const TimeChart = (props: { title: string; monthBuckets: MonthBucket[] }) => {
    const sortedMonths = props.monthBuckets
        .map(bucket => {
            // subtract 1 from month because Date uses 0 index
            const date = new Date(bucket.year, bucket.month - 1)
            return { x: date, y: bucket.count }
        })
        .sort((a, b) => (a > b ? 1 : -1))

    const chartDataset = sortedMonths.map(bucket => {
        return { x: `${bucket.x.toLocaleString('default', { month: 'short' })}`, y: bucket.y }
    })

    const settings = {
        xAxis: [{ dataKey: 'x', label: 'Month' }],
        yAxis: [{ label: 'New Accounts' }],
        height: 300,
    }

    return (
        <Card>
            <CardContent>
                <Typography sx={{ mb: '1rem' }} fontWeight="bold">
                    {props.title}
                </Typography>
                <BarChart dataset={chartDataset} series={[{ dataKey: 'y' }]} {...settings} />
            </CardContent>
        </Card>
    )
}
