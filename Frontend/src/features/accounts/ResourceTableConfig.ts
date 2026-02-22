import type { GridColDef, GridPreProcessEditCellProps } from '@mui/x-data-grid'
import { GENERAL_ERROR, STATUS_ENUMS } from '../../constants'
import type { ResourceInfo } from '../../types/resources'

const dateTimeValueGetter = (dateString: string) => {
    try {
        return new Date(dateString)
    } catch {
        return dateString
    }
}

export const resourceColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name', editable: true, flex: 3 },
    { field: 'type', headerName: 'Type', editable: true, flex: 3 },
    {
        field: 'status',
        headerName: 'Status',
        editable: true,
        type: 'singleSelect',
        valueOptions: STATUS_ENUMS,
        flex: 2,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        editable: true,
        flex: 2,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const value = Number(params.props.value)
            const hasError = !Number.isInteger(value) && value < 0
            return { ...params.props, error: hasError }
        },
    },
    {
        field: 'created',
        headerName: 'Created',
        type: 'dateTime',
        editable: false,
        flex: 5,
        valueGetter: dateTimeValueGetter,
    },
    {
        field: 'modified',
        headerName: 'Modified',
        type: 'dateTime',
        editable: false,
        flex: 5,
        valueGetter: dateTimeValueGetter,
    },
]

export const handleResourceRowUpdate = async (
    updatedRow: ResourceInfo,
    originalRow: ResourceInfo,
    setEdited: (id: string) => void,
    resourceState: ResourceInfo[],
    updateResourceState: (newResources: ResourceInfo[]) => void,
) => {
    const { id } = updatedRow
    try {
        if (JSON.stringify(updatedRow) !== JSON.stringify(originalRow)) {
            setEdited(id)
        }
        const updatedResources = resourceState.map(resource =>
            resource.id === originalRow.id ? updatedRow : resource,
        )
        updateResourceState(updatedResources)
        return updatedRow
    } catch {
        alert(GENERAL_ERROR)
        return originalRow
    }
}
