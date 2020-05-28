import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProblemCard from 'components/common/card/ProblemCard';
import Circular from 'components/common/atoms/Circular';
import { UserContext } from 'contexts';
import { Problem } from 'services/models/problem';
import paths from 'paths';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

type ProblemsProps = { problems: Problem[]; loading?: boolean };

const CardIndex: React.FC<ProblemsProps> = ({ problems, loading }) => {
  const sortState = localStorage.getItem('aimSortBy') || 'new';
  const hideState = localStorage.getItem('aimHideDone') || 'hide';
  const { user } = useContext(UserContext);
  const [hideChecked, setHideChecked] = useState(hideState === 'hide');
  const [sort, setSort] = useState<string>(sortState);

  const handleHide = () => {
    const state = !hideChecked ? 'hide' : 'show';
    localStorage.setItem('aimHideDone', state);
    setHideChecked(!hideChecked);
  };

  // FIXME more clean
  const handlSort = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);

    const { value } = event.target;

    localStorage.setItem('aimSortBy', String(value));

    if (value === 'new') {
      problems.sort((a, b) => {
        const secondsA = a.createdAt ? a.createdAt.seconds : 0;
        const secondsB = b.createdAt ? b.createdAt.seconds : 0;

        return secondsB - secondsA;
      });
    } else {
      problems.sort((a, b) => {
        const gradeA = a.grade;
        const gradeB = b.grade;

        if (value === 'hard') return gradeB - gradeA;

        return gradeA - gradeB;
      });
    }
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
      <div style={{ width: '100%' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          px={4}
          mb={2}
          bgcolor="background.paper"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={hideChecked}
                  onChange={handleHide}
                  name="hideSwitch"
                  color="primary"
                />
              }
              label="登った課題を非表示"
            />
          </FormGroup>
          <FormControl>
            <InputLabel id="select-label">並び替え</InputLabel>
            <Select labelId="select-label" id="select" value={sort} onChange={handlSort}>
              <MenuItem value="new">新しい</MenuItem>
              <MenuItem value="hard">難しい</MenuItem>
              <MenuItem value="soft">易しい</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {problems.map(problem => (
        <ProblemCard user={user} problem={problem} key={problem.id} hidden={hideChecked} />
      ))}
    </>
  );
};

export default CardIndex;
