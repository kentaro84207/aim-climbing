import React from 'react';
import ProblemContainer from 'containers/Home/ProblemContainer';
import ProblemForm from 'components/Problem/problemForm';
import Typography from '@material-ui/core/Typography';
import { blankProblem } from 'services/models/problem';

const ProblemCreate: React.FC = () => {
  const problem = {
    ...blankProblem,
  };
  const problemId = undefined;

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題を登録する
      </Typography>

      {problem ? <ProblemForm problem={problem} pid={problemId} /> : ''}
    </ProblemContainer>
  );
};

export default ProblemCreate;
