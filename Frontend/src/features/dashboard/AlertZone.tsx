import {
    Box,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Link } from 'react-router'
import type { DashboardAlerts } from '../../types/dashboard'
import type { ResourceInfo } from '../../types/resources'
import type { AccountInfo } from '../../types/accounts'
import { Children, type ReactNode } from 'react'

export const AlertZone = (props: { alerts: DashboardAlerts }) => {
    return (
        <Box>
            <Typography variant="h5">Needs Attention</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <AlertList title="Accounts with Stale Resources">
                    {props.alerts?.accounts_stale_resources.map(account => (
                        <AccountLink key={account.id} account={account} />
                    ))}
                </AlertList>
                <AlertList title="Accounts with No Resources">
                    {props.alerts?.accounts_no_resources.map(account => (
                        <AccountLink key={account.id} account={account} />
                    ))}
                </AlertList>
                <AlertList title="Zero Quantity Resources">
                    {props.alerts?.resources_no_quantity.map(resource => (
                        <ResourceLink key={resource.id} resource={resource} />
                    ))}
                </AlertList>
            </Box>
        </Box>
    )
}

const AlertList = (props: { title: string; children: ReactNode }) => {
    const count = Children.count(props.children)
    if (count === 0) {
        return ''
    }

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight="bold">{props.title}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{props.children}</TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

const ResourceLink = (props: { resource: ResourceInfo }) => {
    return (
        <TableRow>
            <TableCell>
                {props.resource.name} (
                <Link to={`/accounts/${props.resource.account_id}`}>{props.resource.account}</Link>)
            </TableCell>
        </TableRow>
    )
}

const AccountLink = (props: { account: AccountInfo }) => {
    return (
        <TableRow>
            <TableCell>
                <Link to={`/accounts/${props.account.id}`}>{props.account.name}</Link>
            </TableCell>
        </TableRow>
    )
}
