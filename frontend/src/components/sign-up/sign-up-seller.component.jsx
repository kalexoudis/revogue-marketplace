import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container, Paper, Snackbar, Alert,
} from '@mui/material';
import {registerUser} from "../../services/user.service";

const SignUpSeller = () => {

    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [inputFields, setInputFields] = useState(
        {
            user_name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            is_seller: true,
            bank_information: '',
            telephone: '',
            expected_delivery_time: 0,
        });

    const onChange = e => {
        let data = {...inputFields};
        let name = e.target.name;
        let val = e.target.value;
        if (name === 'user_name' || name === 'first_name' || name === 'last_name' || name === 'email' || name === 'password' || name === 'bank_information' || name === 'telephone' || name === 'expected_delivery_time') {
            data = {...data, [name]: val};
        }
        setInputFields(data);
        console.log(inputFields);
    };

    const submit = (event) => {
        event.preventDefault();
        registerUser(
            inputFields,
            response => {
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('is_seller', response.data.is_seller);
                localStorage.setItem('is_admin', response.data.is_admin);
                navigate('/seller-main');
            },
            () => {
                setIsError(true);
            }
        )
    };

    const handleErrorClose = () => {
        setIsError(false);
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={2}
                sx={{
                    padding: '1rem',
                    marginTop: '5rem',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={submit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="user_name"
                            label="brand name"
                            id="user_name"
                            autoComplete="company name"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="first_name"
                            label="first name"
                            id="first_name"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="last_name"
                            label="last name"
                            id="last_name"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="email"
                            type="email"
                            id="email"
                            autoComplete="email"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="telephone"
                            label="telephone number"
                            type="telephone"
                            id="telephone"
                            autoComplete="telephone"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="bank_information"
                            label="bank information"
                            type="bank_information"
                            id="bank_information"
                            autoComplete="bank_information"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            name="password"
                            label="password"
                            id="password"
                            autoComplete="password"
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            name="expected_delivery_time"
                            label="expected delivery time"
                            id="expected_delivery_time"
                            autoComplete="expected_delivery_time"
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Paper>


            <Snackbar open={isError} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                    Sorry, something went wrong, please try again!

                </Alert>
            </Snackbar>
        </Container>
    );
}

export default SignUpSeller
