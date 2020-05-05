import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProblemCard from 'components/common/card/problemCard';
import Circular from 'components/common/atoms/circular';
import { UserContext } from 'contexts';
import { Problem } from 'services/models/problem';
import paths from 'paths';

type ProblemsProps = { problems: Problem[]; loading?: boolean };

const CardIndex: React.FC<ProblemsProps> = ({ problems, loading }) => {
  const { user } = useContext(UserContext);

  if (loading) return <Circular />;

  if (!problems.length) {
    return (
      <Link style={{ marginTop: '100px' }} to={paths.signup}>
        アカウントの新規登録はこちらから
      </Link>
    );
  }

  return (
    <>
      {problems.map(problem => (
        <ProblemCard user={user} problem={problem} key={problem.id} />
      ))}
    </>
  );
};

export default CardIndex;
