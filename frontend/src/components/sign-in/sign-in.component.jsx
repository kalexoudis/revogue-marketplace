import {useState} from 'react';

import {loginUser} from "../../services/user.service";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container, Paper, Snackbar, Alert,

} from '@mui/material';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [inputFields, setInputFields] = useState([
        {
            email: '',
            password: ''
        }
    ]);

    const onChange = e => {
        let data = {...inputFields};
        let name = e.target.name;
        let val = e.target.value;
        if (name === 'email' || name === 'password') {
            data = {...data, [name]: val};
        }
        setInputFields(data);
    };

    const submit = (e) => {
        e.preventDefault();
        loginUser(
            inputFields,
            response => {
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('is_seller', response.data.is_seller);
                localStorage.setItem('is_admin', response.data.is_admin);
                if (response.data.is_seller) {
                    navigate('/seller-main');
                    window.location.reload();
                } else {
                    navigate('/');
                }

            },

            () => {
                setIsError(true);
            }
        );
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
                        Sign in
                    </Typography>
                    <Box component="form" sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
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
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            onChange={onChange}
                            value={inputFields.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={submit}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                    Something went wrong, please try again!
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default SignIn
