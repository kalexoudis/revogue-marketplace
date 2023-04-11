import {
    Box,
    AppBar,
    Toolbar,
    Grid,
} from "@mui/material";

import SellerDrawer from "../../seller-drawer/seller-drawer.component";
import Dropdown from "../../dropdown/dropdown.component";

const SellerNavbar = () => {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                position="relative"
                style={{
                    backgroundColor: "#FCD3D3",
                    color: "black",
                    maxHeight: "45px",
                    justifyContent: "center"
                }}>
                <Toolbar>
                    <SellerDrawer/>
                    <Grid container justifyContent="flex-end">
                        <Dropdown/>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
};

export default SellerNavbar;
