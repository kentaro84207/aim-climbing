import React from 'react';
import { Link } from 'react-router-dom';
import HomeContainer from 'containers/Home/HomeContainer';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const Problem: React.FC = () => {
  const classes = useStyles();

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        マイページ
      </Typography>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button component={Link} to="/problem/new">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="課題を追加する" />
          </ListItem>
          <ListItem button component={Link} to="/problem">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="作った課題" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button component={Link} to="/signin">
            <ListItemText primary="Signin" />
          </ListItem>
        </List>
      </div>
    </HomeContainer>
  );
};

export default Problem;
