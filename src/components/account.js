import React, { useState, useEffect, useContext } from 'react';
import { HomeContext } from '../context/home-context';
import clsx from 'clsx';
import axios from 'axios';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';

import { authMiddleWare } from '../util/auth';

const styles = (theme) => ({
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
});

const Account = (props) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
     axios.defaults.headers.common = { Authorization: `${authToken}` };
   axios
      .get(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/user'
      )
      .then((response) => {
        setEmail(response.data.userCredentials.email);
        setUsername(response.data.userCredentials.username);
        setLoading(false);
        console.log('jmk response.data', response.data);
      })
      .catch((error) => {
        props.history.push('/login');
        setErrorMsg(error);
      });
  }, []);

                             const { classes } = props;

                             if (loading === true) {
                               return (
                                 <main className={classes.content}>
                                   <div className={classes.toolbar} />
                                   {loading && (
                                     <CircularProgress
                                       size={150}
                                       className={classes.uiProgess}
                                     />
                                   )}
                                 </main>
                               );
                             } else {
                               return (
                                 <main className={classes.content}>
                                   <div className={classes.toolbar} />

                                   <Card
                                     className={clsx(classes.root, classes)}
                                   >
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
