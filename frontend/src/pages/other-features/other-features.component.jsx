import {useEffect, useState} from "react";
import {getMe, otherFeatures} from "../../services/user.service";
import {useNavigate} from "react-router-dom";

import {
    Typography,
    InputLabel,
    Container,
    Paper,
    Button,
    Box,
    TextField,
    Grid, Snackbar, Alert,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const gender = [
    {
        value: 'noGender',
        label: '',
    },
    {
        value: 'male',
        label: 'male',
    },
    {
        value: 'female',
        label: 'female',
    },
];

const age = [
    {
        value: 'noAge',
        label: '',
    },
    {
        value: 'teenager',
        label: '18-20',
    },
    {
        value: 'twenty',
        label: '20-30',
    },
    {
        value: 'thirty',
        label: '30-40',
    },
    {
        value: 'forty',
        label: '+40',
    },
];

const colour = [
    {
        value: 'noColour',
        label: '',
    },
    {
        value: 'white',
        label: 'white',
    },
    {
        value: 'black',
        label: 'black',
    },
    {
        value: 'yellow',
        label: 'yellow',
    },
    {
        value: 'blue',
        label: 'blue',
    },
    {
        value: 'red',
        label: 'red',
    },
    {
        value: 'green',
        label: 'green',
    },
];

const OtherFeatures = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [user_fav_colour, setUser_fav_colour] = useState('');
    const [user_noGo_colour, setUser_noGo_colour] = useState('');
    const [user_gender, setUser_gender] = useState('');
    const [user_age, setUser_age] = useState('');

    const handleChange_gender = (event) => {
        setUser_gender(event.target.value);
    };

    const handleChange_age = (event) => {
        setUser_age(event.target.value);
    };

    const handleChange_user_fav_colour = (event) => {
        setUser_fav_colour(event.target.value);
    };

    const handleChange_user_noGo_colour = (event) => {
        setUser_noGo_colour(event.target.value);
    };

    useEffect(() => {
        getMe(
            response => {
                setUser_fav_colour(response.data.favourite_colour);
                setUser_noGo_colour(response.data.no_go_colour);
                setUser_gender(response.data.gender)
                setUser_age(response.data.age);
            },
            error => {
                setIsError(true);
            }
        )
    });

    const submit = (e) => {
        e.preventDefault();
        otherFeatures(
            {user_fav_colour, user_noGo_colour, user_gender, user_age},
            response => {
                if (response.data.is_seller) {
                    navigate('/seller-main');
                } else {
                    navigate('/');
                }
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
                <Box component="form"
                     sx={{
                         "& .MuiTextField-root": {m: 1, width: "100%"},
                         display: "flex",
                         flexDirection: "column",
                         textAlign: "center",
                         justifyContent: "center",
                     }}
                     noValidate
                     autoComplete="off"
                >
                    <Typography component="h1" variant="h5">CREATE YOUR PROFILE </Typography>
                    <Typography component="h1" variant="h6" marginTop="30px">
                        OTHER FEATURES AND PREFERENCEES
                    </Typography>
                    <Grid container
                          spacing={3}
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                              marginTop: "30px"
                          }}
                    >
                        <Grid item xs={6} md={3}>
                            <InputLabel>GENDER</InputLabel>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                id="outlined-select-user_gender-native"
                                select
                                label=""
                                value={user_gender}
                                onChange={handleChange_gender}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {gender.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <InputLabel>AGE</InputLabel>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                id="outlined-select-user_age-native"
                                select
                                label=""
                                sx={{marginTop: "5px"}}
                                value={user_age}
                                onChange={handleChange_age}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {age.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <InputLabel>FAVOURITE COLOUR</InputLabel>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                id="outlined-select-user_fav_colour-native"
                                select
                                label=""
                                value={user_fav_colour}
                                onChange={handleChange_user_fav_colour}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {colour.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <InputLabel>NO GO COLOUR</InputLabel>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                id="outlined-select-user_noGo_colour-native"
                                select
                                label=""
                                value={user_noGo_colour}
                                onChange={handleChange_user_noGo_colour}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {colour.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Button
                            Centered Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={submit}
                        >
                            submit
                        </Button>
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

export default OtherFeatures;
