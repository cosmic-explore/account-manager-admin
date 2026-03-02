import { Container, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { LoginForm } from './LoginForm'

export const LoginPage = () => {
    return (
        <Container sx={{ minHeight: '100vh' }}>
            <Typography variant="h2" sx={{ pt: '4rem', pb: '4rem' }}>
                Account Management Platform
            </Typography>
            <Container maxWidth="sm">
                <Card variant="outlined" sx={{ p: '2rem' }}>
                    <CardContent>
                        <Typography variant="h5" align="left">
                            Sign in
                        </Typography>
                        <LoginForm />
                    </CardContent>
                </Card>
            </Container>
        </Container>
    )
}
