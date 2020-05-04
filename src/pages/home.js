import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress from '@material-ui/core/CircularProgress';

import { authMiddleWare } from '../util/auth';

const drawerWidth = 240;

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
    margin: '15px'

  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '45%',
    top: '35%',
  },
  toolbar: theme.mixins.toolbar,
});

const Home = (props) => {
  const [loading, setLoading] = useState(false);



  const logoutHandler = (event) => {
    localStorage.removeItem('AuthToken');
    props.history.push('/login');
  };

    const { classes } = props;

    useEffect(() => {
      authMiddleWare(props.history);
      const authToken = localStorage.getItem('AuthToken');
       axios.defaults.headers.common = { Authorization: `${authToken}` };
    }, [loading]);

    if (loading === true) {
      return (
          <div className={classes.root}>
            {loading && (
              <CircularProgress size={150} className={classes.uiProgess} />
            )}
          </div>
      );
    } else {
      return (
      
          <div className={classes.root}>
          <CssBaseline />
            
          
            <main className={classes.main}>
              
              <Button component={Link} to={'/account'} className={classes.buttons}>Account</Button>
            <Button component={Link} to={'/drafts'} className={classes.buttons}>Drafts</Button>
            <Button component={Link} to={'/admin'} className={classes.buttons}>Admin</Button>
            <Button onClick={logoutHandler} className={classes.buttons}>Log Out</Button>
            </main>
          </div>
   
      );
    }
}

export default withStyles(styles)(Home);