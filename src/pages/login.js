import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const styles = (theme) => ({
  buttons: {
    minWidth: '120px',
    background: 'linear-gradient(45deg, #cd2626 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white !important',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
});

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uiLoading, setUiLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  
const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    setUiLoading(true);
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/login',
        userData
      )
      .then((response) => {
        setUiLoading(true);
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        props.history.push('/home');
      })
      .catch((error) => {
        setUiLoading(false);
        setErrors(error);
      });
  };

 
    const { classes } = props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              // className={classes.buttons}
              onClick={handleSubmit}
              disabled={!email || !password}
              style={{marginTop: '15px', marginBottom: '18px' }}
            >
              Go
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    );
}

export default withStyles(styles)(Login);
