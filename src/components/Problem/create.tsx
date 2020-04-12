import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProblemContainer from 'containers/Home/ProblemContainer';
import { FirebaseContext, UserContext } from 'contexts';
import writeProblem from 'services/write-problem';
import paths from 'paths';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import { Problem, blankProblem } from 'services/models/problem';

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
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [problem, setProblem] = React.useState<Problem>({
    ...blankProblem,
  });
  const [imageAsFile, setImageAsFile] = React.useState<File | undefined>(
    undefined,
  );
  const history = useHistory();

  const updateProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setProblem({
        ...problem,
        [e.target.name]: e.target.value,
        setterId: user?.id,
        setterName: user?.displayName,
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
    if (db && imageAsFile) {
      writeProblem(db, problem, imageAsFile).then(() => {
        setTimeout(() => {
          history.replace(paths.home);
        }, 1000);
      });
    }
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
