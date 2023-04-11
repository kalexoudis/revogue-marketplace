import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, onClose, productId, productItemId, handleAcceptAndClose}) {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" fontWeight="bold">
                    {" Do you want to continue?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" color="black">
                        You will get the points once you accept the product.
                        But the product cannot be returned after this confirmation.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="contained" color="error">Cancel</Button>
                    <Button onClick={() => handleAcceptAndClose(productId, productItemId)} variant="contained" autoFocus color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
