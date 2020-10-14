import React, { useState, useEffect } from 'react';
import validation from "../../validation";
import { Redirect, Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import pandora from "@faizaanceg/pandora";
import { Avatar, Button, CssBaseline, TextField, Link as MatLink, Grid, Box, Container, makeStyles, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import  Home  from "@material-ui/icons/Home";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MatLink color="inherit" href="/">
                Kameysh
      </MatLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });
    const [regValue, setRegValue] = useState(pandora.get('users', []));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const styleError = {
        color: 'blue',
        textAlign: 'center'
    }

    function HandleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function HandleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        setIsSubmitting(true);
    }

    //allowing the user to sumit only if there is no error
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            Submit();
        }
    }, [errors]);

    function Submit() {
        const newArr = regValue;
        newArr.push({ id: values.length, username: values.username, email: values.email, password: values.password1 })
        pandora.set('users', newArr);
        setRegValue(newArr);
        setSubmitted(true);
    }
    
    return submitted ? <Redirect to='/login' /> : (
        <Container component="main" maxWidth="xs">
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to='/'><Navbar.Brand to='/'><Home style={{ fontSize: 40 }} fontSize="large" /></Navbar.Brand></Link>
            </Navbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form onSubmit={HandleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                values={values.username}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                onChange={HandleChange}
                            />
                            <div style={styleError}> {errors.username && <p>{errors.username}</p>} </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                values={values.email}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={HandleChange}
                            />
                            <div style={styleError}> {errors.email && <p>{errors.email}</p>} </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                values={values.password1}
                                required
                                fullWidth
                                name="password1"
                                label="Password"
                                type="password"
                                id="password1"
                                onChange={HandleChange}
                            />
                            <div style={styleError}> {errors.password1 && <p>{errors.password1}</p>} </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                values={values.password2}
                                required
                                fullWidth
                                name="password2"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                onChange={HandleChange}
                            />
                            <div style={styleError}> {errors.password2 && <p>{errors.password2}</p>} </div>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}