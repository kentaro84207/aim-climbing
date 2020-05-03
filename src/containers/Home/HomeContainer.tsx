import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from 'components/common/navi/NavigationBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const HomeContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const location = useLocation().pathname.slice(1);
  const path = location ? `${location}` : 'index';

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>{children}</div>
      <NavigationBar path={path} />
    </Container>
  );
};

export default HomeContainer;
