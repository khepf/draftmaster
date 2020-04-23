import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Draggable } from 'react-smooth-dnd';
import arrayMove from 'array-move';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);

  const onDrop = ({ removedIndex, addedIndex }) => {
    setTeams((teams) => arrayMove(teams, removedIndex, addedIndex));
  };

  useEffect(() => {
    axios
      .get(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/teams'
      )
      .then((response) => {
        console.log('jmk teams response', response);
        setTeams(response.data);
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
    <List>
      <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
        {teams.map((team) => (
          <Draggable key={team.teamId}>
            <ListItem>
              <ListItemText primary={team.name} />
              <ListItemText primary={team.owner} />
              <ListItemText primary={team.league} />
              <ListItemSecondaryAction>
                <ListItemIcon className="drag-handle">
                  <DragHandleIcon />
                </ListItemIcon>
              </ListItemSecondaryAction>
            </ListItem>
          </Draggable>
        ))}
      </Container>
    </List>
  );
};

export default Teams;
