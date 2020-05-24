import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { theme } from 'theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import firebaseConfig from './firebase-config';
import FirebaseApp from './FirebaseApp';

import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <FirebaseApp>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </FirebaseApp>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
