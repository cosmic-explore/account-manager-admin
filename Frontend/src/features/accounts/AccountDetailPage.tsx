import { Box, Button, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestAccountResources } from '../../api/accounts'
import type { AccountInfo } from '../../types/accounts'
import { DefaultPage } from '../../layout/DefaultPage'
import type { ResourceInfo } from '../../types/resources'
import { DataGrid } from '@mui/x-data-grid'
import { handleResourceRowUpdate, resourceColumns } from './ResourceTableConfig'
import { requestUpdateResource } from '../../api/resources'
import { GENERAL_ERROR } from '../../constants'

export const AccountDetailPage = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null)
    const [resources, setResources] = useState<ResourceInfo[]>([])
    const [editedRows, setEditedRows] = useState<string[]>([])
    const [successNoteViz, setSuccessNoteViz] = useState<boolean>(false)

    const isEdited = editedRows.length > 0
    const { id: accountId } = useParams()
    if (!accountId) {
        throw Error('Invalid Account ID')
    }

    useEffect(() => {
        requestAccountResources(accountId).then(response => {
            const sortedResources = sortResources(response.resources)
            setAccount(response.account)
            setResources(sortedResources)
        })
    }, [accountId])

    const addEditedRow = (resourceId: string) => {
        if (editedRows.includes(resourceId)) {
            return
        } else {
            editedRows.push(resourceId)
            setEditedRows([...editedRows])
        }
    }

    const sortResources = (resourceArray: ResourceInfo[]) => {
        return resourceArray.sort((a, b) => (new Date(a.modified) > new Date(b.modified) ? -1 : 1))
    }

    const handleUpdateClick = async () => {
        let hasError = false
        for (const resourceId of editedRows) {
            const resourceToUpdate = resources.find(resource => resource.id === resourceId)
            if (!resourceToUpdate) {
                console.error(`Resource with id ${resourceId} not found when updating.`)
                hasError = true
                return
            }
            try {
                const { name, type, status, quantity } = resourceToUpdate
                await requestUpdateResource(resourceId, { name, type, status, quantity })
                setSuccessNoteViz(true)
            } catch {
                console.error(`Failed to update resource with id ${resourceId}.`)
                hasError = true
            }
        }
        if (hasError) {
            alert(`${GENERAL_ERROR}\nOne or more rows failed to update.`)
        }
        requestAccountResources(accountId).then(response => {
            setEditedRows([])
            const sortedResources = sortResources(response.resources)
            setResources(sortedResources)
        })
    }

    return (
        <DefaultPage>
            <Typography variant="h4">{account?.name}</Typography>
            <Typography variant="h5" align="left" sx={{ pb: '1rem' }}>
                Resources
            </Typography>
            <DataGrid
                editMode="row"
                columns={resourceColumns}
                rows={resources}
                processRowUpdate={(updatedRow: ResourceInfo, originalRow: ResourceInfo) =>
                    handleResourceRowUpdate(
                        updatedRow,
                        originalRow,
                        addEditedRow,
                        resources,
                        setResources,
                    )
                }
                onProcessRowUpdateError={() => alert('actually an error')}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    disabled={!isEdited}
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handleUpdateClick}
                >
                    Update
                </Button>
            </Box>
            <Snackbar
                open={successNoteViz}
                onClose={() => setSuccessNoteViz(false)}
                autoHideDuration={3000}
                message="Update successful."
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </DefaultPage>
    )
}
