import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import landing from './pages/landing';
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import account from './pages/account';
import drafts from './pages/drafts';
import admin from './pages/admin';


import draft from './components/draft';
import testpage from './pages/testpage';


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

      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={landing} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/home" component={home} />
              
              <Route exact path="/account" component={account} />

              <Route exact path="/drafts" component={drafts} />
              <Route path="/drafts/:id" component={draft} />

              <Route exact path="/admin" component={admin} />

              <Route exact path="/test" component={testpage} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
  );
}

export default App;
