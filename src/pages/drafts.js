import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from '../util/auth';
import axios from 'axios';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import TheNavBar from '../components/thenavbar';

const styles = (theme) => ({
  buttons: {
    minWidth: '120px',
    background: 'linear-gradient(45deg, #cd2626 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
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
  }, []);

  const deleteDraftHandler = (data) => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    let draftId = data.draft.draftId;
    axios
      .delete(
        `https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/draft/${draftId}`
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        <>
        <TheNavBar />
        <main className={classes.content}>
          
          
          <div className={ classes.cards}>
            {drafts.map((draft, index) => (
              <Link
                underline="none"
                key={index}
                component={RouterLink}
                to={`/drafts/${draft.draftId}`}
              >
                <Card {...rest} key={index} className={classes.card}>
                  <CardContent>
                    <h4>League Name: {draft.leagueName}</h4>
                    <h4>Draft Year: {draft.leagueYear}</h4>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button className={classes.buttons} onClick={() => deleteDraftHandler({ draft })}>
                      Delete Draft
                  </Button>
                    
                  </CardActions>
                </Card>
              </Link>
            ))}
          </div>
         
        </main>
        </>
      );
    }
}

export default withStyles(styles)(Drafts);