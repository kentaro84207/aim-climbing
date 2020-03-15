import React from 'react';
import HomeContainer from 'containers/Home/HomeContainer';
import Typography from '@material-ui/core/Typography';
import ResultTable from 'components/common/table/resultTable';

const Result: React.FC = () => {
  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        リザルト
      </Typography>
      <ResultTable />
    </HomeContainer>
  );
};

export default Result;
