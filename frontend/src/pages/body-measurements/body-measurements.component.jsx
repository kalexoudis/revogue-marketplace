import {Container, Paper, Box, Button, TextField, InputLabel, Grid, Typography, Snackbar, Alert} from '@mui/material';
import {bodyMeasurements, getMe} from "../../services/user.service";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'


const BodyMeasurements = () => {
        const navigate = useNavigate();
        const [isError, setIsError] = useState(false);
        const [inputFields, setInputFields] = useState([{
            hip_height: '',
            chest_circumference: '',
            hip_size: '',
            upper_body_height: '',
            height: ''
        }
        ]);

        const onChange = e => {
            let data = {...inputFields};
            let name = e.target.name;
            let val = e.target.value;
            if (name === 'hip_height' || name === 'chest_circumference' || name === 'hip_size' || name === 'upper_body_height' || name === 'height') {
                data = {...data, [name]: val};
            }
            setInputFields(data);
            console.log(inputFields);
        };

        useEffect(() => {
            getMe(
                response => {
                    setInputFields(response.data);
                },
                error => {
                    setIsError(true);
                }
            )
        });

        const submit = (e) => {
            e.preventDefault();
            bodyMeasurements(
                inputFields,
                response => {
                    navigate('/other-features');
                },
                (response) => {
                    setIsError(true);
                }
            )
        };

        const handleErrorClose = () => {
            setIsError(false);
        }

        return (
            <Container component="main" maxWidth="xl">
                <Paper
                    elevation={0}
                    sx={{
                        padding: "1rem",
                        marginTop: "5rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            CREATE YOUR PROFILE
                        </Typography>
                        <Typography component="h2" variant="h6" sx={{padding: "50px"}}>
                            ENTER YOUR BODY MEASUREMENTS
                        </Typography>
                        <Grid container
                              spacing={2}
                              direction="row"
                              justifyContent="left"
                              alignItems="center"
                              component="form" sx={{mt: 1}}
                        >
                            <Grid item xs={6} md={3}>
                                <InputLabel>HIP HEIGHT</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    margin="normal"
                                    id="hip_height"
                                    label="cm"
                                    name="hip_height"
                                    required
                                    autoComplete="hip_height"
                                    autoFocus
                                    onChange={onChange}
                                    value={inputFields.hip_height}
                                />
                            </Grid>

                            <Grid item xs={6} md={3}>
                                <InputLabel>CHEST CIRCUMFERENCE</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    margin="normal"
                                    id="chest_circumference"
                                    label="cm"
                                    name="chest_circumference"
                                    required
                                    autoComplete="chest_circumference"
                                    autoFocus
                                    onChange={onChange}
                                    value={inputFields.chest_circumference}
                                />
                            </Grid>

                            <Grid item xs={6} md={3}>
                                <InputLabel>HIP SIZE</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    margin="normal"
                                    id="hip_size"
                                    label="cm"
                                    name="hip_size"
                                    required
                                    autoComplete="hip_size"
                                    autoFocus
                                    onChange={onChange}
                                    value={inputFields.hip_size}
                                />
                            </Grid>

                            <Grid item xs={6} md={3}>
                                <InputLabel>BUST SIZE</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    margin="normal"
                                    id="upper_body_height"
                                    label="cm"
                                    name="upper_body_height"
                                    required
                                    autoComplete="upper_body_height"
                                    autoFocus
                                    onChange={onChange}
                                    value={inputFields.upper_body_height}
                                />
                            </Grid>

                            <Grid item xs={6} md={3}>
                                <InputLabel>HEIGHT</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    margin="normal"
                                    id="height"
                                    label="cm"
                                    name="height"
                                    required
                                    autoComplete="height"
                                    autoFocus
                                    onChange={onChange}
                                    value={inputFields.height}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={submit}
                                >
                                    submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                <Snackbar open={isError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error">
                        Sorry, something went wrong, please try again!
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
;

export default BodyMeasurements;
