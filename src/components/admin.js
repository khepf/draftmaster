import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardContent, Divider } from '@material-ui/core';

import ExcelReader from '../components/excelreader';
import { authMiddleWare } from '../util/auth';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: {},
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  }
});

const Admin = (props) => {

  const [uiLoading, setUiLoading] = useState(true);
  const { classes, ...rest } = props;

  useEffect(() => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    setUiLoading(false);
  }, [uiLoading]);
 
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
              <h1 style={{textAlign: 'center'}}>ADMIN PAGE</h1>
              <ExcelReader />
            </CardContent>
            <Divider />
          </Card>
        </main>
      );
    }
}

export default withStyles(styles)(Admin);
