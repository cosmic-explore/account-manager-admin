import { Alert, AlertTitle, Box, Container, Stack, Typography } from '@mui/material'
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
                <Alert severity="info" sx={{ mt: '1rem', textAlign: 'left' }}>
                    <AlertTitle>Login Information</AlertTitle>
                    <Typography variant="body1" sx={{ mb: '1rem' }}>
                        Welcome! This demo has two types of user. In addition to everything Staff
                        can do, Admins can also view user activity on the platform. You can login to
                        each using the following credentials:
                    </Typography>
                    <Box sx={{ mb: '1rem' }}>
                        <Typography>Staff</Typography>
                        <CredentialRow label="email" value="staff1@test.com" />
                        <CredentialRow label="password" value="p@ssword1" />
                    </Box>
                    <Box>
                        <Typography>Admin</Typography>
                        <CredentialRow label="email" value="admin@test.com" />
                        <CredentialRow label="password" value="p@ssword" />
                    </Box>
                </Alert>
            </Container>
        </Container>
    )
}

const CredentialRow = (props: { label: string; value: string }) => {
    return (
        <Stack direction="row" spacing={1}>
            <Typography>
                <strong>{props.label}:</strong>
            </Typography>
            <Typography>{props.value}</Typography>
        </Stack>
    )
}
