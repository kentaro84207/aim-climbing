/* eslint-disable no-alert */
import React, { useContext, useEffect } from 'react';
import switchMouse from 'services/switch-mouse';
import { FirebaseContext, UserContext } from 'contexts';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const MouseSwitch: React.FC = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const isMoue = !!user?.isMouse;
  const [state, setState] = React.useState({
    checked: isMoue,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (db && user && user.id) {
      switchMouse(db, user.id, !state.checked);
      setState({ ...state, [name]: event.target.checked });
    }
  };

  useEffect(() => {
    setState({ checked: isMoue });
  }, [isMoue]);

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
