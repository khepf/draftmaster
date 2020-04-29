import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import LandingCard from '../components/landingcard';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  }
});

const Landing = (props) => {
  
    const { classes } = props;
    return (
      <Container className={classes.root}>
        <CssBaseline />
        <section>
          <LandingCard></LandingCard>
        </section>
      </Container>
    );
}

export default withStyles(styles)(Landing);