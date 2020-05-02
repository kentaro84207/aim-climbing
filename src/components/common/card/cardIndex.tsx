import React from 'react';
import ProblemCard from 'components/common/card/problemCard';
import Circular from 'components/common/atoms/circular';
import { Problem } from 'services/models/problem';

type ProblemsProps = { problems: Problem[]; loading?: boolean };

const CardIndex: React.FC<ProblemsProps> = ({ problems, loading }) => {
  if (loading) return <Circular />;

  return (
    <>
      {problems.map(problem => (
        <ProblemCard problem={problem} key={problem.id} />
      ))}
    </>
  );
};

export default CardIndex;
