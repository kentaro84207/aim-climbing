import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemContainer from 'containers/Home/ProblemContainer';
import Typography from '@material-ui/core/Typography';

const Problem: React.FC = () => {
  const { problemId } = useParams();

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題{problemId}
      </Typography>
    </ProblemContainer>
  );
};

export default Problem;
