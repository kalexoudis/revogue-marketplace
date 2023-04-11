import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';

import {Link} from "react-router-dom";

function AddProductButton({buttonColour, marginBottom="0px"}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant={buttonColour}
                    sx={{
                        paddingX: "8px",
                        paddingY: "8px",
                        marginBottom: marginBottom,
                    }}
                    onClick={handleClickOpen}
            >
                Add Clothes
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {/*TODO: Make it look good*/}
                <DialogTitle>Which type of clothes do you want to add?</DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem component={Link} to="/add-coat">
                            <ListItemText primary="COAT"/>
                        </ListItem>
                        <Divider/>
                        <ListItem component={Link} to="/add-skirt">
                            <ListItemText primary="SKIRT"/>
                        </ListItem>
                        <Divider/>
                        <ListItem component={Link} to="/add-trouser">
                            <ListItemText primary="TROUSERS"/>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddProductButton;
