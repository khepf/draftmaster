import React, { Component } from 'react';
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
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/drafts'
      )
      .then((response) => {
        const draftToDisplay = response.data.filter((d) => {
          console.log('d.draftId', d.draftId);
          return d.draftId === this.props.match.params.id;
        });

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
    const { classes, to, staticContext, ...rest } = this.props;
    console.log('this.state.draft', this.state.draft.player);
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
            <h2>
              Select Player from {this.state.draft.leagueName}{' '}
              {this.state.draft.leagueYear} Draft
            </h2>
            <div>
              <Card {...rest} className={classes.card}>
                <CardContent>
                  <Autocomplete
                    id="players"
                    options={this.state.draft.players}
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
}

export default withStyles(styles)(draft);
