import { useEffect, useState } from 'react'
import type { PersonInfo } from '../../types/persons'
import { requestPersons } from '../../api/persons'
import { DefaultPage } from '../../layout/DefaultPage'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { PersonTableRow } from './PersonTableRow'

export const PersonsPage = () => {
    /* NOTE: User is the frontend term for the backend Person */
    const [personsList, setPersonsList] = useState<PersonInfo[]>([])

    useEffect(() => {
        requestPersons().then(response => setPersonsList(response))
    }, [])

    return (
        <DefaultPage>
            <Typography variant="h4" sx={{ pb: '1rem' }}>
                Users
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {personsList.map(person => (
                        <PersonTableRow key={person.id} {...person} />
                    ))}
                </TableBody>
            </Table>
        </DefaultPage>
    )
}
