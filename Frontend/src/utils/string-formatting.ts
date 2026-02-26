
export const formatDateString = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleString()
    } catch {
        return dateString
    }
}