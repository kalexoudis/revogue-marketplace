import {useState} from "react";
import {Button, Popover, Grid} from "@mui/material";
import {logoutUser} from "../../services/user.service";

import {Link} from "react-router-dom";

const Dropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button color="inherit" onClick={handleClick}>
                {localStorage.getItem("name")}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    style: {width: '130px', marginTop: '10px'},
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Grid container justifyContent="center">
                    {localStorage.getItem("is_admin") === "true"
                        ? null
                        : (
                            <Grid item xs={12}>
                                <Button color="inherit" sx={{p: 0.5, width: "100%"}} component={Link}
                                        to={localStorage.getItem("is_seller") === "false" ? "/account/details" : "/edit-profile"}>
                                    {localStorage.getItem("is_seller") === "false" ? "My Account" : "Edit Profile"}
                                </Button>
                            </Grid>
                        )
                    }
                    <Grid item xs={12}>
                        <Button color="inherit" sx={{p: 0.5, width: "100%"}} onClick={logoutUser}>Sign Out</Button>
                    </Grid>
                </Grid>
            </Popover>
        </div>
    )
        ;
};
export default Dropdown;
