import {
    Card, CircularProgress,
    Container,
    Divider,
    Grid, Link,
    Stack,
    Typography
} from "@mui/material";
import {useState, useEffect} from "react";
import PointsInformationModal from "./PointsInformationModal";
import {getPoints} from "../../services/points.service";

const MyPointsComponent = () => {

    const [points, setPoints] = useState(0)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true)
        getPoints().then((response) => {
            setPoints(response.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    return (
        <>
            {isLoading &&
                <CircularProgress/>
            }
            {
                !isLoading &&
                <Card style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    <Typography style={{fontWeight: "bold", fontSize: 18, marginBottom: "20px", padding: "20px"}}>
                        My Points
                    </Typography>
                    <Divider/>
                    <Stack style={{marginTop: "10px", width: "100%"}}>
                        <Container style={{display: "flex", flexDirection: "column"}}>
                            <Link href="#" underline="hover" onClick={handleOpen}>Learn more about ReVogue
                                Points</Link>
                            <PointsInformationModal open={open} handleClose={handleClose}/>
                        </Container>
                    </Stack>
                    <Grid container style={{margin: "40px 0px", width: "100%"}}>
                        <Grid item xs>
                            <Stack>
                                <Typography fontSize="64px" fontWeight="700px" color="deeppink">
                                    {points}
                                </Typography>
                                <Typography>
                                    Total Points
                                </Typography>
                            </Stack>
                        </Grid>
                        <Divider orientation="vertical" flexItem/>
                        <Grid item xs>
                            <Stack>
                                <Typography fontSize="64px" fontWeight="700px" color="deeppink">
                                    {points / 100} &euro;
                                </Typography>
                                <Typography>
                                    Value in euros
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>
            }
        </>
    )
}

export default MyPointsComponent