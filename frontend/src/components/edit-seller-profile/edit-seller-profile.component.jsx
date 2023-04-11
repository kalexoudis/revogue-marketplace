import {useEffect, useState} from "react";
import {Button, Card, Container, Divider, FormControl, Grid, Stack, TextField, Typography} from "@mui/material";
import {getMe} from "../../services/user.service";
import {updateUser} from "../../services/user.service";

const EditSellerProfile = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        expected_deivery_time: null,
        bank_information: "",
    });

    useEffect(() => {
        getMe(
            (response) => {
                setUser(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [])

    const handleChangeDetail = (e) => {
        user[e.target.name] = e.target.value
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user,
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        )
    }

    return (
        <Grid item xs={8}>
            <Card style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
            }}>
                <Typography variant="h3" sx={{padding: "15px"}}>My Profile</Typography>
                <Divider/>
                <Stack style={{marginTop: "40px", width: "100%"}}>
                    <Container style={{display: "flex", flexDirection: "column"}}>
                        <Typography align="left" style={{fontWeight: "bold"}}>Personal Information</Typography>
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
                                                value={user.first_name}
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
                                                value={user.last_name}
                                                onChange={handleChangeDetail}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                sx={{width: "100%"}}
                                                required
                                                label="ExpectedDeliveryDate"
                                                name="expected_delivery_date"
                                                type="number"
                                                value={user.expected_delivery_date}
                                                onChange={handleChangeDetail}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                sx={{width: "100%"}}
                                                required
                                                label="BankInFormation"
                                                name="bank_information"
                                                type="text"
                                                value={user.bank_information}
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
                                                value={user.email}
                                                placeholder="Enter your email"
                                                onChange={handleChangeDetail}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{paddingBottom: "10px"}}>
                                            <Button variant="contained" sx={{backgroundColor: "black"}}
                                                    onClick={handleSubmit}>
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </form>
                        </div>
                    </Container>
                </Stack>
            </Card>
        </Grid>
    );
}

export default EditSellerProfile;
