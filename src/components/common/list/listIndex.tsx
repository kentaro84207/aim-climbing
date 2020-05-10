import React from 'react';
import ProblemItem from 'components/common/list/ProblemItem';
import Circular from 'components/common/atoms/Circular';
import { Problem } from 'services/models/problem';

type ProblemsProps = { problems: Problem[]; loading?: boolean };

const ListIndex: React.FC<ProblemsProps> = ({ problems, loading }) => {
  if (loading) return <Circular />;

  return (
    <>
      {problems.map(problem => (
        <ProblemItem problem={problem} key={problem.id} />
      ))}
    </>
  );
};

export default ListIndex;
