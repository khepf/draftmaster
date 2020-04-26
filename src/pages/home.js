import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Account from '../components/account';
import Todo from '../components/todo';
import Drafts from '../components/drafts';
import Admin from '../components/admin';
import Draft from '../components/draft';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import { authMiddleWare } from '../util/auth';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20,
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
  const [profilePicture, setProfilePicture] = useState('');
  const [uiLoading, setUiLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [tabName, setTabName] = useState('account');
  const [errorMsg, setErrMsg] = useState('');
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
  

  const tabChange = (tabName) => {
    setTabName(tabName);
  }

  const logoutHandler = (event) => {
    localStorage.removeItem('AuthToken');
    props.history.push('/login');
  };

  const renderTab = () => {
    console.log('jmk tabName', tabName);
    switch (tabName) {
      case 'account':
        return <Account/>;
      case 'todo':
        return <Todo />;
      case 'drafts':
        return <Drafts/>;
      case 'admin':
        return <Admin />;
      case 'draft':
        return <Draft />;
      default:
        return <Account />;
    }
  }

  useEffect(() => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/user')
      .then((response) => {
        setEmail(response.data.userCredentials.email);
        setUsername(response.data.userCredentials.username);
        setUiLoading(false);
        setProfilePicture(response.data.userCredentials.imageUrl);
      })
      .catch((error) => {
        props.history.push('/login');
        setErrMsg(error);
      });
  })

    const { classes } = props;
    if (uiLoading === true) {
      return (
        <div className={classes.root}>
          {uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Draft Manager
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <center>
              <Avatar
                src={profilePicture}
                className={classes.avatar}
              />
            </center>
            <Divider />
            <List>
              <ListItem
                button
                key="Account"
                onClick={tabChange.bind(this, 'account')}
              >
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem
                button
                key="Todo"
                onClick={tabChange.bind(this, 'todo')}
              >
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText primary="Todo" />
              </ListItem>

              <ListItem
                button
                key="Drafts"
                onClick={tabChange.bind(this,'drafts')}
              >
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>

              <ListItem
                button
                key="Admin"
                onClick={tabChange.bind(this, 'admin')}
              >
                <ListItemIcon>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>

              <ListItem button key="Logout" onClick={logoutHandler}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
          <div>{renderTab()}</div>
        </div>
      );
    }
}

export default withStyles(styles)(Home);
