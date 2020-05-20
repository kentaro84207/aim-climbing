import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MypageContainer from 'containers/Home/MypageContainer';
import { UserContext } from 'contexts';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const MypageShow: React.FC = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <MypageContainer>
      <Typography component="h1" variant="h5">
        {user?.displayName}
      </Typography>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button component={Link} to="/problem/new">
            <ListItemText secondary="現在のスコア" />
            <ListItemText primary={user?.score} />
          </ListItem>
        </List>
        <Divider />
      </div>
    </MypageContainer>
  );
};

export default MypageShow;
