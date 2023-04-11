import {Button, Card, Grid, Stack, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import DraftsIcon from "@mui/icons-material/Drafts";
import {useNavigate} from "react-router-dom";
const AccountSideBar = () => {
    const navigate = useNavigate()

    return (
        <Card style={{width: "100%", display: "flex", justifyContent: "flex-start"}}>
                <Stack>
                    <Typography style={{fontWeight: "bold", fontSize: 22, marginBottom: "25px", padding: "20px"}}>My
                        Account</Typography>
                    <Button variant="text" startIcon={<AccountCircleIcon/>}
                            style={{color: "black", margin: "10px"}} onClick={() => navigate("/account/details")}>My
                        Details</Button>
                    <Button variant="text" startIcon={<LoyaltyIcon/>}
                            style={{color: "black", margin: "10px"}} onClick={() => navigate("/account/points")}>My
                        Points</Button>
                    <Button variant="text" startIcon={<DraftsIcon/>}
                            style={{color: "black", margin: "10px"}} onClick={() => navigate("/account/orders")}>My
                        Orders</Button>
                </Stack>
            </Card>
    )
}

export default AccountSideBar