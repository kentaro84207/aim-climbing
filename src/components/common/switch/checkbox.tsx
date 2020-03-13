import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxSwitch: React.FC = () => {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState({ ...state, [name]: event.target.checked });
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
