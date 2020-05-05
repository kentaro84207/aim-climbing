import React, { useEffect, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FirebaseContext } from 'contexts';
import paths from 'paths';

const AuthRedirect: React.FC = ({ children }) => {
  const { auth } = useContext(FirebaseContext);
  const history = useHistory();
  const location = useLocation().pathname;
  const authPaths = [paths.login, paths.signup];
  const counterRef = useRef(0);

  const checkLogined = auth?.onAuthStateChanged(async firebaseUser => {
    if (!firebaseUser && !authPaths.includes(location) && counterRef.current === 1) {
      history.replace(paths.login);
    }
  });

  useEffect(() => {
    counterRef.current += 1;

    return checkLogined;
  });

  return <>{children}</>;
};

export default AuthRedirect;
