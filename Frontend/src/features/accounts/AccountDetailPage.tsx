import { Box, Button, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestAccountResources } from '../../api/accounts'
import type { AccountInfo } from '../../types/accounts'
import { DefaultPage } from '../../layout/DefaultPage'
import type { ResourceCreateData, ResourceInfo } from '../../types/resources'
import { DataGrid } from '@mui/x-data-grid'
import { handleResourceRowUpdate, resourceColumns } from './ResourceTableConfig'
import { requestCreateResource, requestUpdateResource } from '../../api/resources'
import { GENERAL_ERROR, NEW_ROW_ID, STATUS_ENUMS } from '../../constants'

export const AccountDetailPage = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null)
    const [resources, setResources] = useState<ResourceInfo[]>([])
    const [editedRows, setEditedRows] = useState<string[]>([])
    const [successNoteViz, setSuccessNoteViz] = useState<boolean>(false)

    const isEdited: boolean = editedRows.length > 0
    const isNewRow: boolean = resources.some(r => r.id === NEW_ROW_ID)
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
            const rowResource = resources.find(resource => resource.id === resourceId)
            if (!rowResource) {
                console.error(`Resource with id ${resourceId} not found when updating.`)
                hasError = true
                continue
            }
            const { name, type, status, quantity } = rowResource
            try {
                if (resourceId === NEW_ROW_ID) {
                    await requestCreateResource({
                        name,
                        type,
                        status,
                        quantity,
                        account_id: accountId,
                    })
                } else {
                    await requestUpdateResource(resourceId, { name, type, status, quantity })
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message)
                } else {
                    console.error(`An unknown error occurred for resource ${resourceId}.`)
                }
                hasError = true
            }
        }
        if (hasError) {
            alert(`${GENERAL_ERROR}\nError creating/updating one or more rows.`)
        } else {
            setSuccessNoteViz(true)
        }
        requestAccountResources(accountId).then(response => {
            setEditedRows([])
            const sortedResources = sortResources(response.resources)
            setResources(sortedResources)
        })
    }

    const handleCreateRowClick = () => {
        const newRow: ResourceInfo = {
            id: NEW_ROW_ID,
            account: account?.name || '',
            name: '',
            type: '',
            status: STATUS_ENUMS[0],
            quantity: 0,
            created: '',
            modified: '',
        }
        const resourcesUpdated = [...resources]
        const editedRowsUpdated = [...editedRows]
        resourcesUpdated.push(newRow)
        editedRowsUpdated.push(newRow.id)
        setResources(resourcesUpdated)
        setEditedRows(editedRowsUpdated)
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                <Button disabled={!isEdited} variant="contained" onClick={handleUpdateClick}>
                    Confirm Updates
                </Button>
                <Button
                    disabled={isNewRow}
                    variant="contained"
                    sx={{ ml: 1 }}
                    onClick={handleCreateRowClick}
                >
                    Add Row
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
