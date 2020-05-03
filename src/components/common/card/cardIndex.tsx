import React, { useContext } from 'react';
import ProblemCard from 'components/common/card/problemCard';
import Circular from 'components/common/atoms/circular';
import { UserContext } from 'contexts';
import { Problem } from 'services/models/problem';

type ProblemsProps = { problems: Problem[]; loading?: boolean };

const CardIndex: React.FC<ProblemsProps> = ({ problems, loading }) => {
  const { user } = useContext(UserContext);

  if (loading) return <Circular />;

  return (
    <>
      {problems.map(problem => (
        <ProblemCard user={user} problem={problem} key={problem.id} />
      ))}
    </>
  );
};

export default CardIndex;
