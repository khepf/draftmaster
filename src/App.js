import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import landing from './pages/landing';
import draft from './components/draft';

import { HomeContextProvider } from './context/home-context';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#FF5722',
      dark: '#d50000',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <HomeContextProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={landing} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/home" component={home} />
              <Route path="/drafts/:id" component={draft} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </HomeContextProvider>
  );
}

export default App;
