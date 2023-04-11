import {
    Alert,
    Button,
    Card,
    Container,
    Divider, FormControl,
    Grid, Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getMe, updateUser} from "../../services/user.service";

const AccountDetailsComponent = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [detail, setDetail] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: ""
    })

    useEffect(() => {
        getMe(
            (response) => {
                setDetail(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [])

    const handleChangeDetail = (e) => {
        detail[e.target.name] = e.target.value
        setDetail({...detail, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(detail,
            response => {
                setIsSuccess(true);
            },
            error => {
                setIsError(true);
            }
        )
    }

    const handleErrorClose = () => {
        setIsError(false);
    }

    const handleSuccessClose = () => {
        setIsSuccess(false);
    }

    return (

        <Card style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
        }}>
            <Typography style={{fontWeight: "bold", fontSize: 18, marginBottom: "20px", padding: "20px"}}>My
                Details</Typography>
            <Divider/>
            <Stack style={{marginTop: "40px", width: "100%"}}>
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <Typography align="left" style={{fontWeight: "bold"}}>Personal
                        Information</Typography>
                    <Divider/>
                    <div className="body" style={{marginTop: "20px"}}>
                        <form id="user-details-form">
                            <FormControl className="form-control" variant="standard" fullWidth>
                                <Grid container spacing={2.5}>
                                    <Grid item xs={6}>
                                        <TextField
                                            sx={{width: "100%"}}
                                            required
                                            label="FirstName"
                                            name="first_name"
                                            type="text"
                                            value={detail.first_name}
                                            placeholder="Enter your firstName"
                                            onChange={handleChangeDetail}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            sx={{width: "100%"}}
                                            required
                                            label="LastName"
                                            name="last_name"
                                            type="text"
                                            value={detail.last_name}
                                            placeholder="Enter your lastName"
                                            onChange={handleChangeDetail}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{width: "100%"}}
                                            required
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={detail.email}
                                            placeholder="Enter your email"
                                            onChange={handleChangeDetail}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{width: "100%"}}
                                            required
                                            label="Shipping Address"
                                            name="address"
                                            type="text"
                                            value={detail.address}
                                            placeholder="Enter your shipping address"
                                            onChange={handleChangeDetail}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <Button variant="contained" onClick={handleSubmit}
                                    style={{backgroundColor: "black", marginTop: "20px"}}>
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </Container>
            </Stack>
            <Stack style={{marginTop: "40px", width: "100%"}}>
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <Typography align="left" style={{fontWeight: "bold"}}>Your Profile</Typography>
                    <Divider/>
                    <form>
                        <Button variant="contained"
                                style={{backgroundColor: "black", margin: "20px 0px 20px"}}
                                onClick={() => navigate("/body-measurement")}
                        >
                            Edit Profile
                        </Button>
                    </form>
                </Container>
            </Stack>

            <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{width: '100%'}}>
                    Successfully updated your details!
                </Alert>
            </Snackbar>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                    Something went wrong, please try again!
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default AccountDetailsComponent
