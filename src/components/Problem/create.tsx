import React from 'react';
import ProblemContainer from 'containers/Home/ProblemContainer';
import ProblemForm from 'components/Problem/problemForm';
import Typography from '@material-ui/core/Typography';
import { blankProblem } from 'services/models/problem';

const ProblemCreate: React.FC = () => {
  const problem = {
    ...blankProblem,
  };

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題を編集する
      </Typography>

      {problem ? <ProblemForm problem={problem} /> : ''}
    </ProblemContainer>
  );
};

export default ProblemCreate;
