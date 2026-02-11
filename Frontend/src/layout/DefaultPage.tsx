import type { ReactNode } from 'react'
import { Card, CardContent, Container } from '@mui/material'

export const DefaultPage = ({ children }: { children: ReactNode }) => {
    return (
        <Container sx={{ p: '2rem' }}>
            <Card variant="outlined" sx={{ p: '2rem' }}>
                <CardContent>{children}</CardContent>
            </Card>
        </Container>
    )
}
