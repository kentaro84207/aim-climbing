import React from 'react';
import MypageContainer from 'containers/Home/MypageContainer';
import ProblemForm from 'components/Problem/problemForm';
import Typography from '@material-ui/core/Typography';
import { blankProblem } from 'services/models/problem';

const ProblemCreate: React.FC = () => {
  const problem = {
    ...blankProblem,
  };
  const problemId = undefined;

  return (
    <MypageContainer>
      <Typography component="h1" variant="h5">
        課題を登録する
      </Typography>

      {problem ? <ProblemForm problem={problem} pid={problemId} /> : ''}
    </MypageContainer>
  );
};

export default ProblemCreate;
