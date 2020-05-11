import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'services/models/user';
import { Problem } from 'services/models/problem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    width: '100%',
    textDecoration: 'none',
  },
  card: {
    display: 'flex',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  content: {
    display: 'flex',
    width: '100%',
  },
  column1: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 30%',
  },
  column2: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 60%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 10%',
  },
}));

const ProblemCard: React.FC<{ user: User | null; problem: Problem }> = ({ user, problem }) => {
  const classes = useStyles();
  const { name, grade, id } = problem;

  const ascentUsers = problem && problem.users ? problem.users : [];
  const ascentStatus = user && user.id ? ascentUsers.includes(user.id) : false;
  const statusLabel = ascentStatus ? <CheckCircle color="primary" /> : <RadioButtonUncheckedIcon />;

  return (
    <Link className={classes.root} to={`problem/${id}`}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div className={classes.column1}>
            <Typography variant="subtitle1" color="textSecondary">
              グレード
            </Typography>
            <Typography component="h5" variant="h6">
              {grade}
            </Typography>
          </div>
          <div className={classes.column2}>
            <Typography variant="subtitle1" color="textSecondary">
              課題名
            </Typography>
            <Typography component="h5" variant="h6">
              {name}
            </Typography>
          </div>
          <div className={classes.center}>{statusLabel}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProblemCard;
