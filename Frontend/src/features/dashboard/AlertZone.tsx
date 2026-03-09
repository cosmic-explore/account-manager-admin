import {
    Card,
    CardContent,
    Stack,
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
import { StyledTableRow } from '../../styling/StyledComponents'
import { WarningAmber } from '@mui/icons-material'

export const AlertZone = (props: { alerts: DashboardAlerts }) => {
    return (
        <Card
            elevation={0}
            sx={{
                backgroundColor: 'warning.light',
                border: theme => `1px solid ${theme.palette.warning.main}`,
            }}
        >
            <CardContent>
                <Typography variant="h4" color="warning.dark" sx={{ mb: '1rem' }}>
                    {/* The linter doens't expect the .dark in the color below even though it works */}
                    {/* @ts-ignore */}
                    <WarningAmber color="warning.dark" sx={{ mr: '.5rem' }} />
                    Needs Attention
                </Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-evenly' }}>
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
                    <AlertList title="Resources with Zero Quantity">
                        {props.alerts?.resources_no_quantity.map(resource => (
                            <ResourceLink key={resource.id} resource={resource} />
                        ))}
                    </AlertList>
                </Stack>
            </CardContent>
        </Card>
    )
}

const AlertList = (props: { title: string; children: ReactNode }) => {
    const count = Children.count(props.children)
    if (count === 0) {
        return ''
    }

    return (
        <Card elevation={3}>
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
        <StyledTableRow>
            <TableCell>
                {props.resource.name} (
                <Link to={`/accounts/${props.resource.account_id}`}>{props.resource.account}</Link>)
            </TableCell>
        </StyledTableRow>
    )
}

const AccountLink = (props: { account: AccountInfo }) => {
    return (
        <StyledTableRow>
            <TableCell>
                <Link to={`/accounts/${props.account.id}`}>{props.account.name}</Link>
            </TableCell>
        </StyledTableRow>
    )
}
