import React from 'react';
import HomeContainer from 'containers/Home/HomeContainer';
import ResultTable from 'components/common/table/resultTable';
import useUsers from 'hooks/use-users';
import Typography from '@material-ui/core/Typography';

const Result: React.FC = () => {
  const { users, loading } = useUsers();

  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        リザルト
      </Typography>
      <ResultTable users={users} loading={loading} />
    </HomeContainer>
  );
};

export default Result;
