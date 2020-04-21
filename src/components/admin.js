import React, { Component } from 'react';

import ExcelReader from '../components/excelreader';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Card,
  CardContent,
  Divider,
} from '@material-ui/core';

import clsx from 'clsx';

import axios from 'axios';
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
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  locationText: {
    paddingLeft: '15px',
  },
  buttonProperty: {
    position: 'absolute',
    top: '50%',
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  progess: {
    position: 'absolute',
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
  submitButton: {
    marginTop: '10px',
  },
});

class admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uiLoading: true,
 
    };
  }

  componentDidMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    this.setState({
      uiLoading: false,
    });
  };







  render() {
    const { classes, ...rest } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
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
              <h1 style={{textAlign: 'center'}}>ADMIN PAGE</h1>
              <ExcelReader />
              
            </CardContent>
            <Divider />
          </Card>
        </main>
      );
    }
  }
}

export default withStyles(styles)(admin);
