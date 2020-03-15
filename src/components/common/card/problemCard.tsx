import React from 'react';
import { Link } from 'react-router-dom';
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
  row: {
    display: 'flex',
    flex: '1 1 auto',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
  },
}));

const ProblemCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.column}>
          <Typography
            className={classes.row}
            variant="subtitle1"
            color="textSecondary"
          >
            No.01
          </Typography>
          <Typography className={classes.row} component="h5" variant="h5">
            e
          </Typography>
        </div>
        <div className={classes.column}>
          <Typography
            className={classes.row}
            variant="subtitle1"
            color="textSecondary"
          >
            設定者
          </Typography>
          <Typography className={classes.row} component="h5" variant="h5">
            Daniel Woods
          </Typography>
        </div>
        <Link className={classes.center} to="problem/1">
          <ArrowForwardIosIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
