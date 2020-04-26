import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from '../util/auth';
import axios from 'axios';
import {
  Card,
  CardContent,
  Divider
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '100px',
  },
  card: {
    minWidth: '150px',
    margin: '15px',
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
});

const Drafts = (props) => {

  const [uiLoading, setUiLoading] = useState(true);
  const [drafts, setDrafts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    axios
      .get('https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/drafts')
      .then((response) => {
        setUiLoading(false);
        setDrafts(response.data);
      })
      .catch((error) => {
        if (error === 403) {
          props.history.push('/login');
        }
        console.log(error);
        setErrorMsg(error);
      });
  }, [])

    const { classes, ...rest } = props;
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
          <div className={(classes.toolbar, classes.cards)}>
            {drafts.map((draft, index) => (
              <Link
                underline="none"
                key={index}
                component={RouterLink}
                to={`/drafts/${draft.draftId}`}
              >
                <Card {...rest} key={index} className={classes.card}>
                  <CardContent>
                    <h4>{draft.leagueName}</h4>
                    <h4>{draft.leagueYear}</h4>
                  </CardContent>
                  <Divider />
                </Card>
              </Link>
            ))}
          </div>
        </main>
      );
    }
}

export default withStyles(styles)(Drafts);