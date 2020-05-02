import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Circular: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <CircularProgress />
    </div>
  );
};

export default Circular;
