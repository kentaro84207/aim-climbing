import React from 'react';
import HomeContainer from 'containers/Home/HomeContainer';
import Typography from '@material-ui/core/Typography';

const Problem: React.FC = () => {
  return (
    <HomeContainer>
      <Typography component="h1" variant="h5">
        マイページ
      </Typography>
    </HomeContainer>
  );
};

export default Problem;
