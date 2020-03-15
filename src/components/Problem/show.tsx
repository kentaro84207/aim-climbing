import React from 'react';
import { useParams } from 'react-router-dom';
import useProblem from 'hooks/use-problem';
// import { Problem } from 'services/models/problem';
import ProblemContainer from 'containers/Home/ProblemContainer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckboxSwitch from 'components/common/switch/checkbox';

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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { problem } = useProblem(problemId!);

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        {problem?.name}
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
            {problem?.grade}
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
            {problem?.setterName}
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography
            className={classes.column1}
            variant="subtitle1"
            color="textSecondary"
          >
            補足
          </Typography>
          <Typography className={classes.column2} component="h5" variant="h5">
            {problem?.other}
          </Typography>
        </div>
      </div>
      <img className={classes.image} src={problem?.imageURL} alt="" />
    </ProblemContainer>
  );
};

export default ProblemShow;
