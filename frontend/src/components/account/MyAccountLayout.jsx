import {Container, Grid, Paper} from "@mui/material";
import AccountSideBar from "./AccountSideBar";

const MyAccountLayout = ({children}) => {
    return (
        <>
            <Container >
                <Grid container marginTop={5} spacing={2}>
                    <Grid item xs={3}>
                        <AccountSideBar/>
                    </Grid>
                    <Grid item xs={9} >
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default MyAccountLayout