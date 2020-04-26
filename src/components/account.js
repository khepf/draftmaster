import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

import { authMiddleWare } from '../util/auth';

const styles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: {},
  details: {
    display: 'flex',
  },
  locationText: {
    paddingLeft: '15px',
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  uploadButton: {
    marginLeft: '8px',
    margin: theme.spacing(1),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
}));

const Account = (props) => {
  const classes = styles();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [uiLoading, setUiLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    authMiddleWare(props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
          .get('https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/user')
          .then((response) => {
            console.log(response.data);
            setEmail(response.data.userCredentials.email);
            setUsername(response.data.userCredentials.username);
            setUiLoading(false);
          })
          .catch((error) => {
            if (error === 403) {
              props.history.push('/login');
            }
            console.log(error);
            setErrMsg(error);
          });
  }, [email, username, uiLoading]);


  const handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  const profilePictureHandler = (event) => {
    event.preventDefault();
    this.setState({
      uiLoading: true,
    });
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    let form_data = new FormData();
    form_data.append('image', this.state.image);
    form_data.append('content', this.state.content);
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .post(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/user/image',
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({
          uiLoading: false,
          imageError: 'Error in posting the data',
        });
      });
  };

 
    const { ...rest } = props;
    if (uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
      );
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card {...rest} className={clsx(classes.root, classes)}>
            <CardContent>
              <div className={classes.details}>
                <div>
                  <Typography
                    className={classes.locationText}
                    gutterBottom
                    variant="h4"
                  >
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    size="small"
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadButton}
                    onClick={profilePictureHandler}
                  >
                    Upload Photo
                  </Button>
                  <input type="file" onChange={handleImageChange} />

                  {imageError ? (
                    <div className={classes.customError}>
                      {' '}
                      Wrong Image Format || Supported Format are PNG and JPG
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
            <Divider />
          </Card>

          <br />
          <Card {...rest} className={clsx(classes.root, classes)}>
            <form autoComplete="off" noValidate>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      margin="dense"
                      name="email"
                      variant="outlined"
                      disabled={true}
                      value={email} 
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="User Name"
                      margin="dense"
                      name="userHandle"
                      disabled={true}
                      variant="outlined"
                      value={username}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions />
            </form>
          </Card>
        </main>
      );
    }
}

export default withStyles(styles)(Account);
