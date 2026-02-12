import {
    Table,
    TableHead,
    TableCell,
    Typography,
    TableBody,
    TableRow,
    TableContainer,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestAccountResources } from '../../api/accounts'
import type { AccountInfo, ResourceInfo } from '../../types/accounts'
import { ResourceTableRow } from './ResourceTableRow'
import { DefaultPage } from '../../layout/DefaultPage'

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
        <DefaultPage>
            <Typography variant="h4">{account?.name}</Typography>
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
                            return <ResourceTableRow key={resource.id} {...resource} />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </DefaultPage>
    )
}
