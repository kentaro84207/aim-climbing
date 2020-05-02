import React from 'react';
import useProblems from 'hooks/use-problems';
import ProblemContainer from 'containers/Home/ProblemContainer';
import ProblemList from 'components/common/list/problemList';
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
  const { problems } = useProblems({ limit: 50 });

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題一覧
      </Typography>
      <div className={classes.root}>
        <List component="nav" aria-label="problem list">
          {problems.map(problem => (
            <ProblemList problem={problem} key={problem.id} />
          ))}
        </List>
      </div>
    </ProblemContainer>
  );
};

export default Problem;
