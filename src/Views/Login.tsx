import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
// import { RequestParams } from '../../Utils/RequestComponent';
// import Login from '../../Api/Login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../Api/Login';

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Typography
                component="a"
                color="inherit"
                href="https://www.balancenetwork.io/"
            >
                Balance Network
            </Typography>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [onClick, setOnClick] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoginRequest({
            mode: 'login',
            payload: {
                username: data.get('username'),
                password: data.get('password')
            }
        });
        setOnClick(true);
        setTimeout(() => {
            setOnClick(false);
        }, 6000);
    };

    const handleResponse = (success: any) => {
        // console.log('success:', success);

        if (success.length !== 0) {
            navigation('/');
        }
    };
    const handleError = (error: any) => {
        console.log('Error///////:', error);
    };
    const InvalidForm = {
        username: '',
        password: ''
    };
    const [loginRequest, setLoginRequest] = useState<any>({
        mode: '',
        payload: InvalidForm
    });
    return (
        <ThemeProvider theme={defaultTheme}>
            <Login
                params={loginRequest}
                onSuccess={(response: any) => handleResponse(response)}
                onError={(response: any) => handleError(response)}
            />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} />
                <Box
                    component="img"
                    sx={{
                        height: 140,
                        width: 500,
                        mr: 3,
                        position: 'absolute',
                        left: '30%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)'
                    }}
                    alt="The house from the offer."
                    src="./academy.svg"
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
