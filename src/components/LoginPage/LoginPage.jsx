import React, { useState, useEffect } from 'react';
import pandora from "@faizaanceg/pandora";
import { Link, Redirect } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
// import validation from "../../validation";
import validation from "../../loginValidation";
import { Avatar, Button, CssBaseline, TextField, Link as MatLink, Box, Container, makeStyles, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Home from "@material-ui/icons/Home";


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

export default function LoginPage() {
  const classes = useStyles();
  const [values, setValues] = useState({
    Logemail: '',
    password1: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  function HandleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  const styleError = {
    color: 'blue',
    textAlign: 'center'
  }

  function HandleSubmit(e) {
    e.preventDefault();
    setErrors(validation(values));
    setIsSubmitting(true);
  }

  function Submit() {
    const Lists = pandora.get('users');
    const login = Lists.findIndex(list => {
      return (list.email.toLowerCase() === values.Logemail.toLowerCase() && list.password.toLowerCase() === values.password1.toLowerCase())
    })
    //if the user is currently logging in, we are storing the information in local storage
    if (login > -1) {
      pandora.set('loggedInUser', login);
      setSubmitted(true);
    }
  }

  //running the useEffect to actively look for errors change and allowing
  //the user to submit only if there is no error
  useEffect(() => {
    if (Object.keys(errors).length === 0 || isSubmitting) {
      Submit();
    }
  }, [errors]);



  return submitted ? <Redirect to='/profile' /> : (
    <Container component="main" maxWidth="xs">
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to='/'><Navbar.Brand><Home style={{ fontSize: 45 }} fontSize="large" /></Navbar.Brand></Link>
      </Navbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={HandleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Logemail"
            label="Email Address"
            name="Logemail"
            autoFocus
            onChange={HandleChange}
          />
          <div style={styleError}> {errors.Logemail && <p>{errors.Logemail}</p>} </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            onChange={HandleChange}
          />
          <div style={styleError}> {errors.password1 && <p>{errors.password1}</p>} </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}