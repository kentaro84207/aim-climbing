import React from 'react';
import useProblems from 'hooks/use-problems';
import HomeContainer from 'containers/Home/HomeContainer';
import CardIndex from 'components/common/card/cardIndex';
import Typography from '@material-ui/core/Typography';

const Home: React.FC = () => {
  const { problems, loading } = useProblems({ limit: 50 });

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        課題一覧
      </Typography>
      <CardIndex problems={problems} loading={loading} />
    </HomeContainer>
  );
};

export default Home;
