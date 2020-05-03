import React, { useContext } from 'react';
import switchAscent from 'services/switch-ascent';
import { FirebaseContext, UserContext } from 'contexts';
import { Problem } from 'services/models/problem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxSwitch: React.FC<{ problem: Problem }> = ({ problem }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const pid = problem && problem.id ? problem.id : '';
  const ascentUsers = problem && problem.users ? problem.users : [];
  const ascentStatus = user && user.id ? ascentUsers.includes(user.id) : false;
  const [state, setState] = React.useState({
    checked: ascentStatus,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmText = state.checked ? '登ってなかった？' : '登った？';
    if (window.confirm(confirmText) && db && user && user.id) {
      switchAscent(db, user.id, pid, !state.checked);
      setState({ ...state, [name]: event.target.checked });
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked}
            onChange={handleChange('checked')}
            value="checked"
            color="primary"
          />
        }
        label={state.checked ? '完登' : '未完登'}
      />
    </FormGroup>
  );
};

export default CheckboxSwitch;
