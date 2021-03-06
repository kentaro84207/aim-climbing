import React from 'react';
import { useLocation } from 'react-router-dom';
import useProblems from 'hooks/use-problems';
import HomeContainer from 'containers/Home/HomeContainer';
import CardIndex from 'components/common/card/CardIndex';
import Toast from 'components/common/toast/Toast';
import Circular from 'components/common/atoms/Circular';
import messages from 'common/messages';
import { getThisMonth } from 'utils/getDate';
import Typography from '@material-ui/core/Typography';

const Home: React.FC = () => {
  const { problems, loading } = useProblems({ limit: 70 });
  const query = new URLSearchParams(useLocation().search);
  const param = query.get('success');
  const text = param ? messages[param] : '';

  if (loading) return <Circular />;

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        {getThisMonth}月の課題一覧
      </Typography>
      <Typography component="caption" variant="caption">
        ※ 前月1週間前の課題まで表示
      </Typography>
      <CardIndex problems={problems} />
      <Toast text={text} successed={!!param} />
    </HomeContainer>
  );
};

export default Home;
