import {
    Card,
    CardContent,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import type { AccountInfo } from '../../types/accounts'
import { AccountTableRow } from './AccountTableRow'
import { requestAccounts } from '../../api/accounts'

export const AccountsPage = () => {
    const [accountList, setAccountList] = useState<AccountInfo[]>([])

    useEffect(() => {
        requestAccounts().then(response => setAccountList(response))
    }, [])

    return (
        <Container sx={{ p: '2rem' }}>
            <Card variant="outlined" sx={{ p: '2rem' }}>
                <Typography variant="h4">Accounts</Typography>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accountList.map(account => (
                                <AccountTableRow key={account.id} {...account} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    )
}
