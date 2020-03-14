import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemContainer from 'containers/Home/ProblemContainer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckboxSwitch from 'components/common/switch/checkbox';
import test from 'images/test.jpg';

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
    flex: '0 1 30%',
  },
  column2: {
    flex: '0 1 70%',
  },
  flex: {
    display: 'flex',
  },
}));

const ProblemShow: React.FC = () => {
  const classes = useStyles();
  const { problemId } = useParams();

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題名{problemId}
      </Typography>
      <CheckboxSwitch />

      <div className={classes.text}>
        <div className={classes.flex}>
          <Typography
            className={classes.column1}
            variant="subtitle1"
            color="textSecondary"
          >
            月日
          </Typography>
          <Typography className={classes.column2} component="h5" variant="h5">
            2019/03/09
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography
            className={classes.column1}
            variant="subtitle1"
            color="textSecondary"
          >
            グレード
          </Typography>
          <Typography className={classes.column2} component="h5" variant="h5">
            e
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography
            className={classes.column1}
            variant="subtitle1"
            color="textSecondary"
          >
            設定者
          </Typography>
          <Typography className={classes.column2} component="h5" variant="h5">
            Daniel Woods
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography
            className={classes.column1}
            variant="subtitle1"
            color="textSecondary"
          >
            初登者
          </Typography>
          <Typography className={classes.column2} component="h5" variant="h5">
            Daniel Woods
          </Typography>
        </div>
      </div>
      <img className={classes.image} src={test} alt="" />
    </ProblemContainer>
  );
};

export default ProblemShow;
