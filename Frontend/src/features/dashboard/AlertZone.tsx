import { Box, Card, CardContent, TableCell, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router'
import type { DashboardAlerts } from '../../types/dashboard'
import type { ResourceInfo } from '../../types/resources'
import type { AccountInfo } from '../../types/accounts'

export const AlertZone = (props: { alerts: DashboardAlerts }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Needs Attention</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {props.alerts?.accounts_stale_resources.length > 0 ? (
                        <Box>
                            <Typography fontWeight="bold">Accounts with Stale Resources</Typography>
                            {props.alerts?.accounts_stale_resources.map(account => (
                                <AccountLink key={account.id} account={account} />
                            ))}
                        </Box>
                    ) : (
                        ''
                    )}
                    {props.alerts?.accounts_no_resources.length > 0 ? (
                        <Box>
                            <Typography fontWeight="bold">Accounts with No Resources</Typography>
                            {props.alerts?.accounts_no_resources.map(account => (
                                <AccountLink key={account.id} account={account} />
                            ))}
                        </Box>
                    ) : (
                        ''
                    )}

                    {props.alerts?.resources_no_quantity.length > 0 ? (
                        <Box>
                            <Typography fontWeight="bold">Zero Quantity Resources</Typography>
                            {props.alerts?.resources_no_quantity.map(resource => (
                                <ResourceLink key={resource.id} resource={resource} />
                            ))}
                        </Box>
                    ) : (
                        ''
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

const ResourceLink = (props: { resource: ResourceInfo }) => {
    return (
        <Box>
            <TableRow>
                <TableCell>
                    {props.resource.name} (
                    <Link to={`/accounts/${props.resource.account_id}`}>
                        {props.resource.account}
                    </Link>
                    )
                </TableCell>
            </TableRow>
        </Box>
    )
}

const AccountLink = (props: { account: AccountInfo }) => {
    return (
        <Box>
            <TableRow>
                <TableCell>
                    <Link to={`/accounts/${props.account.id}`}>{props.account.name}</Link>
                </TableCell>
            </TableRow>
        </Box>
    )
}
