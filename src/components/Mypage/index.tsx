import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import HomeContainer from 'containers/Home/HomeContainer';
import { FirebaseContext, UserContext } from 'contexts';
import paths from 'paths';
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

const Mypage: React.FC = () => {
  const classes = useStyles();
  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const signOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (auth && user) {
      e.preventDefault();
      auth.signOut();
      history.replace(paths.login);
    }
  };

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
            <ListItemText primary="課題を編集・削除" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button onClick={signOut}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </HomeContainer>
  );
};

export default Mypage;
