import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from '../util/auth';
import axios from 'axios';
import Teams from '../components/teams';
import {
  Card,
  CardContent,
  Divider,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
});

const Draft = (props) => {

  const [uiLoading, setUiLoading] = useState(true);
  const [draft, setDraft] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log('jmk draft props', props);
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get(
        `https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/draft${props.match.params.id}`
      )
      .then((response) => {
        setUiLoading(false);
        setDraft(response.data);
      })
      .catch((error) => {
        if (error === 403) {
          props.history.push('/login');
        }
        console.log(error);
        setErrorMsg(error);
      }, []);
  })

    const { classes, to, staticContext, ...rest } = props;
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
            <h1>Draft Page</h1>
          </div>
          <div>
            <h2>
              Select Player from {draft.leagueName}{' '}
              {draft.leagueYear} Draft
            </h2>
            <div>
              <Card {...rest} className={classes.card}>
                <CardContent>
                  <Autocomplete
                    id="players"
                    options={draft.players}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select..."
                        variant="outlined"
                      />
                    )}
                  />
                </CardContent>
                <Divider />
              </Card>
            </div>
          </div>
          <div>
            <Teams />
          </div>
        </main>
      );
    }
}

export default withStyles(styles)(Draft);
