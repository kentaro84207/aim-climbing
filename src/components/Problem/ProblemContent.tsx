import React from 'react';
import Circular from 'components/common/atoms/Circular';
import { Problem } from 'services/models/problem';
import CheckboxSwitch from 'components/common/switch/Checkbox';
import useUsersName from 'hooks/use-usersName';
import grades from 'common/grades';
import walls from 'common/walls';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
  },
  text: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  column1: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
  },
  column2: {
    width: '70%',
    wordBreak: 'break-all',
  },
  flex: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
}));

const ProblemShow: React.FC<{ problem: Problem; loading?: boolean }> = ({ problem, loading }) => {
  const classes = useStyles();
  const createDate =
    problem && problem.createdAt ? format(problem.createdAt.toDate(), 'yyyy/MM/dd') : '';
  const { userNames } = useUsersName(problem?.users);

  if (loading) return <Circular />;

  return (
    <>
      <Typography component="h1" variant="h5">
        {problem?.name}
      </Typography>
      <CheckboxSwitch problem={problem} />
      <div className={classes.text}>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            月日
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {createDate}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            グレード
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {grades[problem?.grade]}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            壁
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {walls[problem?.wall]}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            設定者
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {problem?.setterName}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            補足
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {problem?.other}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            完登人数
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {problem?.users.length}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography className={classes.column1} variant="subtitle1" color="textSecondary">
            完登者
          </Typography>
          <Typography className={classes.column2} component="h5" variant="subtitle1">
            {userNames.join(', ')}
          </Typography>
        </div>
      </div>
      <img className={classes.image} src={problem?.imageURL} alt="" />
    </>
  );
};

export default ProblemShow;
