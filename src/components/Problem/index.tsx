import React from 'react';
import useProblems from 'hooks/use-problems';
import MypageContainer from 'containers/Home/MypageContainer';
import ListIndex from 'components/common/list/ListIndex';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
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
  const { problems, loading } = useProblems({ limit: 70 });

  return (
    <MypageContainer>
      <Typography component="h1" variant="h5">
        課題を編集・削除
      </Typography>
      <div className={classes.root}>
        <List component="nav" aria-label="problem list">
          <ListIndex problems={problems} loading={loading} />
        </List>
      </div>
    </MypageContainer>
  );
};

export default Problem;
