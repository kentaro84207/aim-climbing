import React from 'react';
import { Link } from 'react-router-dom';
import ProblemContainer from 'containers/Home/ProblemContainer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  row: {
    marginBottom: theme.spacing(3),
  },
}));

const Problem: React.FC = () => {
  const classes = useStyles();

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        作った課題一覧
      </Typography>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="カチ" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="スローパー" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </List>
      </div>
    </ProblemContainer>
  );
};

export default Problem;
