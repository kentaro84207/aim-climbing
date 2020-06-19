/* eslint-disable no-alert */
import React, { useContext, useEffect } from 'react';
import switchMouse from 'services/switch-mouse';
import { FirebaseContext } from 'contexts';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { User } from 'services/models/user';

const MouseSwitch: React.FC<{ user: User | null }> = ({ user }) => {
  const { db } = useContext(FirebaseContext);
  const isMouse = !!user?.isMouse;
  const [state, setState] = React.useState({
    checked: isMouse,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (db && user && user.id) {
      switchMouse(db, user.id, !state.checked);
      setState({ ...state, [name]: event.target.checked });
    }
  };

  useEffect(() => {
    setState({ checked: isMouse });
  }, [isMouse]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={state.checked}
            onChange={handleChange('checked')}
            name="hideSwitch"
            color="primary"
          />
        }
        label="マウスになる"
      />
    </FormGroup>
  );
};

export default MouseSwitch;
