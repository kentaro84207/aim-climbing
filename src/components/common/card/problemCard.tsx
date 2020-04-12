import React from 'react';
import { Link } from 'react-router-dom';
import { Problem } from 'services/models/problem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(2),
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

const ProblemCard: React.FC<{ problem: Problem }> = ({ problem }) => {
  const classes = useStyles();
  const { name, grade, id } = problem;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.column1}>
          <Typography variant="subtitle1" color="textSecondary">
            グレード
          </Typography>
          <Typography component="h5" variant="h5">
            {grade}
          </Typography>
        </div>
        <div className={classes.column2}>
          <Typography variant="subtitle1" color="textSecondary">
            課題名
          </Typography>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
        </div>
        <Link className={classes.center} to={`problem/${id}`}>
          <ArrowForwardIosIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
