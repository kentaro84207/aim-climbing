import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'services/models/user';
import { Problem } from 'services/models/problem';
import grades, { gradeColors, contrastText } from 'common/grades';
import walls from 'common/walls';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import FiberNewIcon from '@material-ui/icons/FiberNew';
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
    overflow: 'inherit',
    marginBottom: theme.spacing(3),
  },
  content: {
    display: 'flex',
    width: '100%',
    borderRadius: '4px 0 0 4px',
  },
  column1: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 20%',
  },
  column2: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 30%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 20%',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '-10px',
    right: '-7px',
    color: theme.palette.secondary.main,
  },
}));

const ProblemCard: React.FC<{ user: User | null; problem: Problem; hidden: boolean }> = ({
  user,
  problem,
  hidden,
}) => {
  const classes = useStyles();
  const { setterName, grade, wall, id, createdAt } = problem;

  const ascentUsers = problem && problem.users ? problem.users : [];
  const ascentStatus = user && user.id ? ascentUsers.includes(user.id) : false;
  const statusLabel = ascentStatus ? <Check color="primary" /> : <div />;
  const today = new Date();
  const threeDaysAgo = today.setDate(today.getDate() - 3) / 1000;
  const isNew = createdAt && createdAt?.seconds > threeDaysAgo;
  const createdDate = createdAt?.toDate();
  const dateMD = createdDate ? format(createdDate, 'MM/dd') : '';
  const isHidden = ascentStatus && hidden;

  return (
    <Link className={classes.root} to={`problem/${id}`} style={isHidden ? { display: 'none' } : {}}>
      <Card className={classes.card}>
        <CardContent
          className={classes.content}
          style={{ backgroundColor: `${gradeColors[grade]}` }}
        >
          <div className={classes.column1}>
            <Typography
              component="h5"
              variant="subtitle1"
              style={{ color: `${contrastText[grade]}` }}
            >
              {dateMD}
            </Typography>
          </div>
          <div className={classes.column1}>
            <Typography component="h5" variant="h6" style={{ color: `${contrastText[grade]}` }}>
              {walls[wall]}
            </Typography>
          </div>
          <div className={classes.column1}>
            <Typography component="h5" variant="h6" style={{ color: `${contrastText[grade]}` }}>
              {grades[grade]}
            </Typography>
          </div>
          <div className={classes.column2}>
            <Typography component="h5" variant="h6" style={{ color: `${contrastText[grade]}` }}>
              {setterName}
            </Typography>
          </div>
        </CardContent>
        <div className={classes.center}>
          {statusLabel}
          <FiberNewIcon className={classes.icon} style={isNew ? {} : { display: 'none' }} />
        </div>
      </Card>
    </Link>
  );
};

export default ProblemCard;
