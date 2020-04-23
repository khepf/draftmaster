import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    minWidth: '120px'
  }
});

export default function MediaCard() {
  const classes = styles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/landing-draft.jpg"
          title="Draft Manager 20"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h4" component="h2">
            Draft Manager 20
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          className={classes.buttons}
        >
          Log In
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
          className={classes.buttons}
        >
          Sign Up
        </Button>
      </CardActions>
    </Card>
  );
}
