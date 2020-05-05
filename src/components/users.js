import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


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
  },
  buttons: {
    minWidth: '120px',
    background: 'linear-gradient(45deg, #cd2626 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: '20px'
  }
}));

const Users = (props) => {
  const classes = styles();
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [isAddTeam, setIsAddTeam] = useState(false);



  useEffect(() => {
    axios
      .get(
        'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/users'
      )
      .then((response) => {
        setUsers(response.data);
        setIsAddTeam(false);
      })
      .catch((error) => {
        if (error === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        setErrorMsg({ errorMsg: 'Error in retrieving the users data', error });
      });
  }, []);

  return (
    <section>
      <h3>Users</h3>
      <List>

          {users.map((user, index) => (
              <ListItem key={index}>
                <ListItemText primary={user.email} />
                <ListItemText primary={user.username} />
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
              </ListItem>
          ))}
      </List>
    </section>
  );
};

export default Users;