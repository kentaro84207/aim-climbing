import React from 'react';
import { useParams } from 'react-router-dom';
import useProblem from 'hooks/use-problem';
import ProblemContainer from 'containers/Home/ProblemContainer';
import ProblemContent from 'components/Problem/ProblemContent';

const ProblemShow: React.FC = () => {
  const { problemId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { problem, loading } = useProblem(problemId!);

  return (
    <ProblemContainer>
      <ProblemContent problem={problem!} loading={loading} />
    </ProblemContainer>
  );
};

export default ProblemShow;
