import React, { useContext } from 'react';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AuthContainer from 'containers/Auth/AuthContainer';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';

import { FirebaseContext, UserContext } from 'contexts';
import paths from 'paths';

// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const Signin: React.FC = () => {
  // const classes = useStyles();
  const { auth } = useContext(FirebaseContext);
  const { setCredential } = useContext(UserContext);
  const { history } = useReactRouter();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: { lang: 'ja' },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setCredential(authResult as firebase.auth.UserCredential);
        const dest = redirectUrl || paths.home;
        history.replace(dest);

        return false;
      },
    },
  };

  return (
    <AuthContainer>
      <Typography component="h1" variant="h5">
        ログイン／新規登録
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      {/* <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form> */}
    </AuthContainer>
  );
};

export default Signin;
