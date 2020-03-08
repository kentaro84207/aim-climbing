import React from 'react';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  content: {
    display: 'flex',
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
  },
}));

const ProblemCard: React.FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          value="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
          disabled
        />
        <Typography className={classes.row} component="h5" variant="h5">
          e
        </Typography>
        <Typography
          className={classes.row}
          variant="subtitle1"
          color="textSecondary"
        >
          ダニエル・ウッズ
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
