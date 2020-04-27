import React, { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import arrayMove from 'array-move';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { authMiddleWare } from '../util/auth';

const styles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      display: 'flex',
    },
  },
  formDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));

const Teams = (props) => {
  const classes = styles();
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({});
  const [errorMsg, setErrorMsg] = useState([]);
  const [isAddTeam, setIsAddTeam] = useState(false);

  const isAddTeamToggle = (event) => {
    event.preventDefault();
    isAddTeam ? setIsAddTeam(false) : setIsAddTeam(true);
    
  }


  const onDrop = ({ removedIndex, addedIndex }) => {
    setTeams((teams) => arrayMove(teams, removedIndex, addedIndex));
  };

  const handleNameChange = (event) => {
    setNewTeam({...newTeam,
      name: event.target.value
    });
  };

  const handleOwnerChange = (event) => {
    setNewTeam({ ...newTeam, owner: event.target.value });
  };

  const handleLeagueChange = (event) => {
    setNewTeam({ ...newTeam, league: event.target.value });
  };
  

  const handleSubmit = (event) => {
    authMiddleWare(props.history);
    event.preventDefault();
    const newTeamData = {
      name: newTeam.name,
      owner: newTeam.owner,
      league: newTeam.league,
    };
    let options = {};
      options = {
        url:
          'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/team',
        method: 'post',
        data: newTeamData,
      };
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios(options)
      .then(() => {
        setNewTeam({ name: '', owner: '', league: ''});
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTeamHandler = (data) => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    let teamId = data.team.teamId;
    axios
      .delete(
        `https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/team/${teamId}`
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/teams'
      )
      .then((response) => {
        setTeams(response.data);
        setIsAddTeam(false);
      })
      .catch((error) => {
        if (error === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        setErrorMsg({ errorMsg: 'Error in retrieving the data', error });
      });
  }, []);

  return (
    <section>
      <List>
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {teams.map((team) => (
            <Draggable key={team.teamId}>
              <ListItem>
                <ListItemIcon className="drag-handle">
                  <DragHandleIcon />
                </ListItemIcon>
                <ListItemText primary={team.name} />
                <ListItemText primary={team.owner} />
                <ListItemText primary={team.league} />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => deleteTeamHandler({ team })}
                  >
                    X
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </Draggable>
          ))}
        </Container>
      </List>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={isAddTeamToggle}
      >
        Add Team
      </Button>
      {isAddTeam && (
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.formDiv}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              color="secondary"
              required
              value={newTeam.name}
              onChange={handleNameChange}
            />
            <TextField
              id="owner"
              name="owner"
              label="Owner"
              variant="outlined"
              color="secondary"
              required
              value={newTeam.owner}
              onChange={handleOwnerChange}
            />
            <TextField
              id="league"
              name="league"
              label="League"
              variant="outlined"
              color="secondary"
              required
              value={newTeam.league}
              onChange={handleLeagueChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={isAddTeamToggle}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Teams;
