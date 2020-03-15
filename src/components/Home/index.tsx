import React, { useContext } from 'react';
import { UserContext } from 'contexts';
import HomeContainer from 'containers/Home/HomeContainer';
import Typography from '@material-ui/core/Typography';
import ProblemCard from 'components/common/card/problemCard';

const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        課題一覧{user?.displayName}
      </Typography>
      <ProblemCard />
      <ProblemCard />
      <ProblemCard />
    </HomeContainer>
  );
};

export default Home;
