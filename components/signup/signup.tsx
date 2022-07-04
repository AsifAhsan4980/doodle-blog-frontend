import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {useForm} from "react-hook-form";
import Auth from "../../api/auth";
import Link from 'next/link';
import {authenticate} from "../../utils/auth";
import PositionedSnackbar, {State} from "../../common/snackBar";
import {useState} from "react";
import { useRouter } from 'next/router'

const theme = createTheme();

const SignUpPage = () => {

    const router = useRouter()

    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm();

    const [state, setState] = useState(false)

    const onSubmit = (data: any) => {
        if (data.password === data.rePassword) {
            const info = {
                email : data.email,
                username : data.name,
                password : data.password
            }

            Auth.register(info).then(res => {
                authenticate(res.data.token, () => {
                    setState(true)
                    router.push('/')
                })
            })  .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    // console.log(error.response.message);
                    if (error.response.data.message==='User already register!'){
                        setError('email', {type: 'custom', message: 'User already register!'}, {shouldFocus: true})
                    }
                    if (error.response.data.message==='Auth validation failed: email: Please provide a valid email'){
                        setError('email', {type: 'custom', message: 'Not a valid Email'}, {shouldFocus: true})
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
        } else {
            setError('password', {type: 'custom', message: 'Password do not match'}, {shouldFocus: true})
            setError('rePassword', {type: 'custom', message: 'Password do not match'}, {shouldFocus: true})
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                { state && PositionedSnackbar({message: "New user Registered"})}
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up to Blog
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            autoComplete="name"
                            autoFocus
                            {...register("name", {required: 'Full name is required'})}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Re-Enter Password"
                            type="re-password"
                            id="re-password"
                            autoComplete="current-re-password"
                            {...register("rePassword", {required: 'Re-Password is required',  minLength: {
                                    value: 8,
                                    message: 'Minimum password Length is 8'
                                }})}
                            error={Boolean(errors.rePassword)}
                            helperText={errors.rePassword?.message}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" {...register('checkBox', {required : "Please Agree to term and condition"})} color="primary"/>}
                            label="I agree to Terms and Condition"

                        />
                        {errors.checkBox && errors.checkBox.type === "required" && (
                            <Box role="alert" color={'red'}>Please click agree to terms and condition to continue</Box>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
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
                                <Link href="/login" >
                                    {"Already have an account? Log In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default SignUpPage