import React from 'react';
import useProblems from 'hooks/use-problems';
import HomeContainer from 'containers/Home/HomeContainer';
import Typography from '@material-ui/core/Typography';
import ProblemCard from 'components/common/card/problemCard';

const Home: React.FC = () => {
  const { problems } = useProblems({ limit: 50 });

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        課題一覧
      </Typography>
      {problems.map(problem => (
        <ProblemCard problem={problem} key={problem.id} />
      ))}
    </HomeContainer>
  );
};

export default Home;
