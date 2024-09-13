//Utilities
import React from 'react'

//Mui
import { Snackbar, Alert } from '@mui/material';
import { useDefault } from '@/contexts/Default';


export default function CustomError() {

    const { error, setError } = useDefault();

    return (
        <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error" sx={{
                width: '100%',
                marginBottom: '40px',
                '@media (max-width:1000px)': { marginBottom: '64px' }
            }}
            >
                {error}
            </Alert>
        </Snackbar>
    )
}
