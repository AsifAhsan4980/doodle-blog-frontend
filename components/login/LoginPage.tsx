import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm} from "react-hook-form";
import auth from "../../api/auth";
import Auth from "../../api/auth";
import { authenticate} from "../../utils/auth";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import PositionedSnackbar from "../../common/snackBar";
import {AuthContext} from "../../pages/_app";


const theme = createTheme();

const LoginPage = () => {

    const router = useRouter()
    const { dispatch }: any = useContext(AuthContext);

    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm();

    const [state, setState] = useState(false)

    const onSubmit = (data : any) => {
        Auth.login(data).then(r => authenticate(r.data.token, () => {
            setState(true)
            // dispatch({
            //
            // })
            router.push('/').then(r => {
                dispatch({
                    payload: r,
                    type: "LOGIN",
                })
            })
        })).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.message);
                if (error.response.data.message==='Invalid credentials'){
                    setError('email', {type: 'custom', message: 'Invalid credentials'}, {shouldFocus: true})
                }  if (error.response.data.message==='Invalid credentials'){
                    setError('password', {type: 'custom', message: 'Invalid credentials'}, {shouldFocus: true})
                }

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                { state && PositionedSnackbar({message: "User Logged in"})}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            {...register("email", {required: 'Email is required'})}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: 'Password is required', minLength: {
                                    value: 8,
                                    message: 'Minimum password Length is 8'
                                }
                            })}

                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                        <FormControlLabel
                            control={<Checkbox {...register('checkBox')} value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/" >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default LoginPage