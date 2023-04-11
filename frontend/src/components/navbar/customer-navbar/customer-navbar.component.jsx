import {
    Box,
    AppBar,
    Toolbar,
    Button,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";

import Dropdown from "../../dropdown/dropdown.component";

const CustomerNavbar = () => {
    return (
        <AppBar position="static"
                style={{backgroundColor: "#FCD3D3", color: "black", maxHeight: "45px", justifyContent: "center"}}>
            {localStorage.getItem("name") ?
                (
                    <Toolbar>
                        <Box display='flex' flexGrow={1}>
                            <Button component={Link} to="/" color="inherit">
                                <HomeIcon/>
                            </Button>
                        </Box>
                        <Button component={Link} to="/wishlist" color="inherit">
                            <FavoriteIcon/>
                        </Button>
                        <Button component={Link} to="/basket" color="inherit">
                            <ShoppingBasketIcon/>
                        </Button>
                        <Dropdown/>

                    </Toolbar>
                ) :
                (
                    <Toolbar>
                        <Box display='flex' flexGrow={1}>
                            <Button component={Link} to="/sign-up-seller" color="inherit">
                                BECOME A BUSINESS PARTNER
                            </Button>
                            <Button component={Link} to="/about" color="inherit">
                                ABOUT US
                            </Button>
                        </Box>
                        <Button component={Link} to="/sign-in" color="inherit">SIGN IN</Button>
                    </Toolbar>
                )
            }
        </AppBar>
    );
};

export default CustomerNavbar;
