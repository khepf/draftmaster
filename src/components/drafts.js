import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from '../util/auth';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
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
    marginTop: '100px'
  },
  card: {
    minWidth: '150px',
    margin: '15px'
  }
  
});

class drafts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uiLoading: true,
      drafts: {},
      errorMsg: null
    };


  }

  componentDidMount = () => {
    console.log('jmk drafts component mounted');
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/drafts')
      .then((response) => {
        console.log(response.data);
        this.setState({
          drafts: response.data,
          uiLoading: false,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({ errorMsg: 'Error in retrieving the data' });
      });

  }

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
          <div className={(classes.toolbar, classes.cards)}>
            {this.state.drafts.map((draft, index) => (
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
}

export default withStyles(styles)(drafts);