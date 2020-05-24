import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProblemCard from 'components/common/card/ProblemCard';
import Circular from 'components/common/atoms/Circular';
import { UserContext } from 'contexts';
import { Problem } from 'services/models/problem';
import paths from 'paths';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

type ProblemsProps = { problems: Problem[]; loading?: boolean };

const CardIndex: React.FC<ProblemsProps> = ({ problems, loading }) => {
  const { user } = useContext(UserContext);
  const [hideChecked, setHideChecked] = React.useState(false);

  const handleChange = () => {
    setHideChecked(!hideChecked);
  };

  if (loading) return <Circular />;

  if (!problems.length) {
    return (
      <>
        <Link style={{ marginTop: '100px' }} to={paths.signup}>
          アカウントの新規登録はこちらから
        </Link>
        <Link style={{ marginTop: '50px' }} to={paths.login}>
          アカウントをお持ちの方はこちらからログイン
        </Link>
      </>
    );
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={hideChecked}
              onChange={handleChange}
              name="hideSwitch"
              color="primary"
            />
          }
          label="登った課題を非表示にする"
        />
      </FormGroup>
      {problems.map(problem => (
        <ProblemCard user={user} problem={problem} key={problem.id} hidden={hideChecked} />
      ))}
    </>
  );
};

export default CardIndex;
