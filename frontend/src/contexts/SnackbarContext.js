import {Alert, Snackbar} from "@mui/material";
import {createContext, useEffect, useState} from "react";

export const SnackBarContext = createContext({});

export function SnackBarProvider({ children }) {
    const initialSnack = {
        message: '',
        severity: 'success',
        open: false,
    };
    const [snack, setSnack] = useState(initialSnack);

    const handleClose = () => {
        setSnack({
            ...initialSnack
        })
    }

    return (
        <SnackBarContext.Provider value={{ snack, setSnack }}>
            {children}
            <Snackbar  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snack.open} autoHideDuration={4000} onClose={handleClose} >
                <Alert severity={snack.severity}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </SnackBarContext.Provider>
    );
}