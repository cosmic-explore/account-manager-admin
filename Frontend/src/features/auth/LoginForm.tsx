import { Box, Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from './UseAuth'
import { CREDENTIALS_ERROR } from '../../constants'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault() // supress default form behavior

        setLoading(true)
        setError(null)

        try {
            await login({ email, password })
            navigate('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : CREDENTIALS_ERROR)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl variant="standard" sx={{ m: 1 }}>
                    <InputLabel>Email</InputLabel>
                    <Input id="email" onChange={event => setEmail(event.target.value)}></Input>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1 }}>
                    <InputLabel>Password</InputLabel>
                    <Input
                        id="password"
                        type="password"
                        onChange={event => setPassword(event.target.value)}
                    ></Input>
                </FormControl>
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" disabled={loading} variant="contained" sx={{ m: 1 }}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </Button>
            </Box>
        </form>
    )
}
