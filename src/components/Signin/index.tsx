import React, { useContext } from 'react';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AuthContainer from 'containers/Auth/AuthContainer';
import Typography from '@material-ui/core/Typography';

import { FirebaseContext, UserContext } from 'contexts';
import paths from 'paths';

const Signin: React.FC = () => {
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
    </AuthContainer>
  );
};

export default Signin;
