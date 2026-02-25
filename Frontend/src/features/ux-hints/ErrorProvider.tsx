import { createContext, useContext, useState, type ReactNode } from 'react'
import { Toast } from './Toast'

const ErrorContext = createContext<{
    error: boolean
    showError: (message: string) => void
} | null>(null)

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    // add an app-wide toast that can be activated whenever an error occurs
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const showError = (message: string) => {
        setErrorMessage(message)
        setErrorStatus(true)
    }

    return (
        <ErrorContext.Provider value={{ error: errorStatus, showError }}>
            {children}
            <Toast
                open={errorStatus}
                setOpen={setErrorStatus}
                message={errorMessage}
                type="error"
            />
        </ErrorContext.Provider>
    )
}

export const useError = () => {
    const context = useContext(ErrorContext)
    if (!context) {
        throw new Error('useError must be used inside ErrorProvider')
    }
    return context
}
