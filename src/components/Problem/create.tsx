import React from 'react';
import ProblemContainer from 'containers/Home/ProblemContainer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  row: {
    marginBottom: theme.spacing(3),
  },
  imageInput: {
    display: 'none',
  },
}));

const grades = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

const ProblemCreate: React.FC = () => {
  const classes = useStyles();
  const [grade, setGrade] = React.useState('EUR');
  const [fileName, setfileName] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
  };

  const getFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setfileName(e.target.files[0].name);
  };

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題を登録する
      </Typography>

      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <div className={classes.row}>
            <TextField
              required
              fullWidth
              id="problem-name"
              label="課題名"
              defaultValue=""
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <TextField
              required
              fullWidth
              id="select-grade"
              select
              label="グレード"
              value={grade}
              onChange={handleChange}
              helperText="豊田グレードです"
              variant="outlined"
            >
              {grades.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.row}>
            <TextField
              fullWidth
              id="problem-other"
              label="補足"
              defaultValue=""
              variant="outlined"
            />
          </div>
          <div className={classes.row}>
            <input
              required
              accept="image/*"
              style={{ display: 'none' }}
              id="button-file"
              type="file"
              onChange={e => getFileName(e)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="button-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<PublishIcon />}
              >
                トポ画像*
              </Button>
              <p>{fileName}</p>
            </label>
          </div>
          <div className={classes.row}>
            <Button fullWidth variant="contained" color="primary">
              登録する
            </Button>
          </div>
        </form>
      </div>
    </ProblemContainer>
  );
};

export default ProblemCreate;
