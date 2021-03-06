import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import paths from 'paths';

const useStyles = makeStyles(() => ({
  bottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    paddingTop: '10px',
    paddingBottom: '10px',
  },
}));

const NavigationBar: React.FC<{ path: string }> = ({ path }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(path);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation className={classes.bottom} value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction
        component={Link}
        value="index"
        to={paths.home}
        label="一覧"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        component={Link}
        value="result"
        to={paths.result}
        label="リザルト"
        icon={<TrendingUpIcon />}
      />
      <BottomNavigationAction
        component={Link}
        value="mypage"
        to={paths.mypage}
        label="マイページ"
        icon={<PlaylistAddIcon />}
      />
    </BottomNavigation>
  );
};

export default NavigationBar;
