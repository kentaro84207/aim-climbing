import React from 'react';
import { Link } from 'react-router-dom';
import paths from 'paths';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'pointer',
  },
}));

const ProblemContainer: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link className={classes.arrow} to={paths.home}>
          <ArrowBackIcon fontSize="large" />
        </Link>
        {children}
      </div>
    </Container>
  );
};

export default ProblemContainer;
