import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableCell,
    Typography,
    TableBody,
    TableRow,
    TableContainer,
    Container,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestAccountResources } from '../../api/accounts'
import type { AccountInfo, ResourceInfo } from '../../types/accounts'

export const AccountDetailPage = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null)
    const [resources, setResources] = useState<ResourceInfo[]>([])

    const { id } = useParams()

    if (!id) {
        throw Error('Invalid Account ID')
    }

    useEffect(() => {
        requestAccountResources(id).then(response => {
            setAccount(response.account)
            setResources(response.resources)
        })
    }, [id])

    return (
        <Container sx={{ p: '2rem' }}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant="h4">{account?.name}</Typography>
                <CardContent>
                    <Typography variant="h5" align="left">
                        Resources
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell>Modified</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resources.map((resource: ResourceInfo) => {
                                    return (
                                        <TableRow key={resource.id}>
                                            <TableCell>{resource.name}</TableCell>
                                            <TableCell>{resource.type}</TableCell>
                                            <TableCell>{resource.status}</TableCell>
                                            <TableCell>{resource.quantity}</TableCell>
                                            <TableCell>{resource.created}</TableCell>
                                            <TableCell>{resource.modified}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    )
}
