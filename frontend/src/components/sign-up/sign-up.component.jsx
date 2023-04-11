import {useState} from 'react';
import {registerUser} from "../../services/user.service";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container, Paper, Snackbar, Alert,
} from '@mui/material';

import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [inputFields, setInputFields] = useState(
        {
            user_name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            is_seller: false,
            address: '',
            telephone: ''
        });

    const onChange = e => {
        let data = {...inputFields};
        let name = e.target.name;
        let val = e.target.value;
        if (name === 'user_name' || name === 'first_name' || name === 'last_name' || name === 'email' || name === 'password' || name === 'address' || name === 'telephone') {
            data = {...data, [name]: val};
        }
        setInputFields(data);
    };

    const submit = (e) => {
        e.preventDefault();
        registerUser(
            inputFields,
            response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('is_seller', response.data.is_seller);
                localStorage.setItem('is_admin', response.data.is_admin);
                navigate('/');
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
                    <Box component="form" sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="user_name"
                            label="user_name"
                            id="user_name"
                            autoComplete="user_name"
                            autoFocus
                            onChange={onChange}
                            value={inputFields.user_name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="first_name"
                            label="first_name"
                            id="first_name"
                            autoComplete="first_name"
                            onChange={onChange}
                            value={inputFields.first_name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="last_name"
                            label="last_name"
                            id="last_name"
                            autoComplete="last_name"
                            autoFocus
                            onChange={onChange}
                            value={inputFields.last_name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="email"
                            id="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onChange}
                            value={inputFields.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            label="password"
                            id="password"
                            autoComplete="password"
                            onChange={onChange}
                            value={inputFields.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="address"
                            label="address"
                            id="address"
                            autoComplete="address"
                            onChange={onChange}
                            value={inputFields.address}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="telephone"
                            label="telephone"
                            id="telephone"
                            autoComplete="telephone"
                            onChange={onChange}
                            value={inputFields.telephone}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={submit}
                        >
                            Continue
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

export default SignUp
