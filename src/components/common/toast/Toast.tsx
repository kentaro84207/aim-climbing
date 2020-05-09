import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles(() => ({
  toast: {
    bottom: '80px',
  },
}));

const Toast: React.FC<{ text: string; successed: boolean }> = ({ text, successed }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(successed);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  };

  return (
    <Snackbar className={classes.toast} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
