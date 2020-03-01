import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AddIcon from '@material-ui/icons/Add';
import paths from 'paths';

const NavigationBar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        component={Link}
        to={paths.home}
        label="一覧"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={paths.result}
        label="リザルト"
        icon={<TrendingUpIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={paths.problem}
        label="追加"
        icon={<AddIcon />}
      />
    </BottomNavigation>
  );
};

export default NavigationBar;
