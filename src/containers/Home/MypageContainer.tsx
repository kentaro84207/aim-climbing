import React from 'react';
import { useHistory } from 'react-router-dom';
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

const MypageContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <button className={classes.arrow} onClick={goBack} type="button">
          <ArrowBackIcon fontSize="large" />
        </button>
        {children}
      </div>
    </Container>
  );
};

export default MypageContainer;
