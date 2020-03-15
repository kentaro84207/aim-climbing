import React, { useContext } from 'react';
import ProblemContainer from 'containers/Home/ProblemContainer';
import { FirebaseContext, UserContext } from 'contexts';
import writeProblem from 'services/write-problem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import { blankProblem } from 'services/models/problem';

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
  const [problem, setProblem] = React.useState({ ...blankProblem });
  const [imageAsFile, setImageAsFile] = React.useState<File | undefined>(
    undefined,
  );
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const updateProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setProblem({
        ...problem,
        [e.target.name]: e.target.value,
        setterId: user?.id,
        setterName: user.displayName,
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/aim-climbing.appspot.com/o/IMG_4470.JPG?alt=media&token=39515fbc-10c7-4c82-95bd-c68dea2c9093',
      });
    }
  };

  const handleImageAsFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setImageAsFile(image);
    }
  };

  const handleFireBaseUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (db) writeProblem(db, problem);
    window.location.replace('/');
  };

  return (
    <ProblemContainer>
      <Typography component="h1" variant="h5">
        課題を登録する
      </Typography>

      <div className={classes.root}>
        <form noValidate autoComplete="off" onSubmit={handleFireBaseUpload}>
          <div className={classes.row}>
            <TextField
              required
              fullWidth
              id="problem-name"
              label="課題名"
              defaultValue={problem.name}
              onChange={updateProblem}
              variant="outlined"
              name="name"
            />
          </div>
          <div className={classes.row}>
            <TextField
              required
              fullWidth
              id="select-grade"
              select
              label="グレード"
              value={problem.grade}
              onChange={updateProblem}
              helperText="豊田グレードです"
              variant="outlined"
              name="grade"
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
              defaultValue={problem.other}
              onChange={updateProblem}
              variant="outlined"
              name="other"
            />
          </div>
          <div className={classes.row}>
            <input
              required
              accept="image/*"
              style={{ display: 'none' }}
              id="button-file"
              type="file"
              onChange={handleImageAsFile}
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
              <p>{imageAsFile?.name}</p>
            </label>
          </div>
          <div className={classes.row}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              登録する
            </Button>
          </div>
        </form>
      </div>
    </ProblemContainer>
  );
};

export default ProblemCreate;
