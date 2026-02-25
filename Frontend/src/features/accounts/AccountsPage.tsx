import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import type { AccountInfo } from '../../types/accounts'
import { AccountTableRow } from './AccountTableRow'
import { requestAccounts } from '../../api/accounts'
import { DefaultPage } from '../../layout/DefaultPage'
import { useError } from '../ux-hints/ErrorProvider'
import { SERVER_ERROR } from '../../constants'

export const AccountsPage = () => {
    const [accountList, setAccountList] = useState<AccountInfo[]>([])
    const { showError } = useError()

    useEffect(() => {
        try {
            requestAccounts().then(response => setAccountList(response))
        } catch {
            showError(SERVER_ERROR)
        }
    }, [])

    return (
        <DefaultPage>
            <Typography variant="h4" sx={{ pb: '1rem' }}>
                Accounts
            </Typography>
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
        </DefaultPage>
    )
}
