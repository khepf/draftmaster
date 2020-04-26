import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import MediaCard from '../components/mediacard';
// import Counter from '../components/counter';
import Counter2 from '../components/counter2';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '45%',
    top: '35%',
  }
});

const Landing = (props) => {
  
    const { classes } = props;
    return (
      <Container className={classes.root}>
        <CssBaseline />
        <section>
          <MediaCard></MediaCard>
        </section>

        {/* <section>
          <Counter2 max={15} step={5}/>
        </section> */}
      </Container>
    );
}

export default withStyles(styles)(Landing);