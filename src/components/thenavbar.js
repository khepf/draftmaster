import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
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
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    flexDirection: 'column',
  },
  draweritems: {
    background: 'linear-gradient(45deg, #cd2626 30%, #FF8E53 90%)',
    borderRadius: 3,
    color: 'white !important',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginBottom: '20px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  
  topToolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  horizontalNavList: {
    display: 'flex'
  }
}));

const TheNavBar = (props) => {
  // const navCategories = ['Account', 'Drafts', 'Admin', 'LogOut']
  const navCategories = [
    { id: 1, displayName: 'Account', navLink: '/account' },
    { id: 2, displayName: 'Drafts', navLink: '/drafts' },
    { id: 3, displayName: 'Admin', navLink: '/admin' },
  ]
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const logoutHandler = (event) => {
    localStorage.removeItem('AuthToken');
    // props.history.push('/login');
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.topToolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Draft Manager 20
          </Typography>
          <Hidden xsDown implementation="css">
            <List className={classes.horizontalNavList}>
              {navCategories.map((item, index) => (
                <ListItem button key={item.id} component={Link} to={item.navLink}>
                  <ListItemText primary={item.displayName} />
                </ListItem>
              ))}
              <ListItem onClick={logoutHandler} component={Link} to={'/'}><ListItemText style={{color: 'white'}}>LogOut</ListItemText></ListItem>
            </List>
          </Hidden>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon />
            </IconButton>
            <div>
              <List>
                {navCategories.map((item, index) => (
                  <ListItem button key={item.id} component={Link} to={item.navLink} className={classes.draweritems}>
                    <ListItemText primary={item.displayName} />
                  </ListItem>


                ))}
                <ListItem component={Link} to={'/'} className={classes.draweritems}><ListItemText>LogOut</ListItemText></ListItem>
              </List>

            </div>
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <h2>Something can go here</h2>
      </div>
    </div>
  );
}
TheNavBar.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default TheNavBar;