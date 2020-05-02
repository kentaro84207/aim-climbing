import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from 'contexts';
import paths from 'paths';

const AuthRedirect: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Redirect to={paths.signin} />;

  return <>{children}</>;
};

export default AuthRedirect;
