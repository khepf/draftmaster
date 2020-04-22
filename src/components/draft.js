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
  details: {
    display: 'flex',
  },
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

class draft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uiLoading: true,
      draft: {},
      errorMsg: null,
    };
  }

  componentDidMount = () => {
    console.log('jmk draft component mounted', this.props);
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/drafts'
      )
      .then((response) => {
        console.log('jmk response.data', response.data);
        console.log('jmk this.props.match.params', this.props.match.params);

        const draftToDisplay = response.data.filter((d) => {
          console.log('d.draftId', d.draftId);
          return d.draftId == this.props.match.params.id;
        });
        console.log('jmk draftToDisplay', draftToDisplay[0]);

        this.setState({
          draft: draftToDisplay[0],
          uiLoading: false,
        });
      })
      .catch((error) => {
        if (error === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({ errorMsg: 'Error in retrieving the data' });
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
          <div className={(classes.toolbar, classes.cards)}>
            <h1>Draft Page</h1>
          </div>
          <div>
            <h3>{this.state.draft.leagueName}</h3>
            <h3>{this.state.draft.leagueYear}</h3>
          </div>
        </main>
      );
    }
  }
}

export default withStyles(styles)(draft);
