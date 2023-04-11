import {Box, Button, Typography} from '@mui/material';

import {Link} from "react-router-dom";

import ImageMan from "../../assets/imgMan.png";
import ImageWoman from "../../assets/imgWoman.png";

const Home = () => {
    return (
        <div style={{paddingTop: "30px"}}>
            <img src={ImageWoman} width="27%" align="left"/>
            <img src={ImageMan} width="27%" align="right"/>
            <Typography paddingTop="20px">ZARAS</Typography>
            <Typography paddingTop="20px">H&A</Typography>
            {localStorage.getItem("token") === null
                ? (
                    <Box paddingTop="20px">
                        <div>
                            <Button component={Link} to="/sign-up" variant="contained" size="large">
                                CREATE YOUR PROFILE
                            </Button>
                        </div>
                    </Box>
                )
                : null
            }
            <Typography paddingTop="20px">JACK&JOLY</Typography>
            <Typography paddingTop="20px">C&M</Typography>
        </div>
    )
}


export default Home;
