import {useState} from "react";

import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {Link} from "react-router-dom";

import AddProductButton from "../add-product-button/add-product-button.component";

const SellerDrawer = () => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                variant="persistent"
                open={open}
            >
                <List>
                    <ListItem divider>
                        <ListItemIcon>
                            <ChevronLeftIcon onClick={handleDrawerClose}/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText>
                            <Button component={Link} sx={{color: "inherit"}} to="/seller-main">HOME</Button>
                        </ListItemText>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText>
                            <AddProductButton buttonColour={"inherit"}/>
                        </ListItemText>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText>
                            <Button component={Link} sx={{color: "inherit"}} to="/seller-orders">ORDERS</Button>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default SellerDrawer;
