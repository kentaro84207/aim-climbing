import React from 'react';
import { useLocation } from 'react-router-dom';
import useProblems from 'hooks/use-problems';
import HomeContainer from 'containers/Home/HomeContainer';
import CardIndex from 'components/common/card/CardIndex';
import Toast from 'components/common/toast/Toast';
import messages from 'common/messages';
import Typography from '@material-ui/core/Typography';

const Home: React.FC = () => {
  const { problems, loading } = useProblems({ limit: 50 });
  const query = new URLSearchParams(useLocation().search);
  const param = query.get('success');
  const text = param ? messages[param] : '';

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        課題一覧
      </Typography>
      <CardIndex problems={problems} loading={loading} />
      <Toast text={text} successed={!!param} />
    </HomeContainer>
  );
};

export default Home;
