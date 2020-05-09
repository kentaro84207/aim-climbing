import React from 'react';
import { useParams } from 'react-router-dom';
import useProblem from 'hooks/use-problem';
import MypageContainer from 'containers/Home/MypageContainer';
import ProblemForm from 'components/Problem/problemForm';
import Typography from '@material-ui/core/Typography';

const ProblemCreate: React.FC = () => {
  const { problemId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { problem } = useProblem(problemId!);

  return (
    <MypageContainer>
      <Typography component="h1" variant="h5">
        課題を編集する
      </Typography>

      {problem ? <ProblemForm problem={problem} pid={problemId} /> : ''}
    </MypageContainer>
  );
};

export default ProblemCreate;
