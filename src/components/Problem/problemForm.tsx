import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FirebaseContext, UserContext } from 'contexts';
import writeProblem from 'services/write-problem';
import paths from 'paths';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import { Problem } from 'services/models/problem';

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
  image: {
    width: '100%',
  },
}));

const ProblemForm: React.FC<{ problem: Problem; pid: string | undefined }> = ({ problem, pid }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [newProblem, setNewProblem] = React.useState<Problem>(problem);
  const [imageAsFile, setImageAsFile] = React.useState<File | undefined>(undefined);
  const isEditing = !!pid;
  const grades = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const [done, setDone] = React.useState(false);

  const updateProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setNewProblem({
        ...newProblem,
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
    if (db) {
      writeProblem(db, newProblem, imageAsFile, pid).then(() => {
        setTimeout(() => {
          setDone(true);
        }, 1000);
      });
    }
  };

  if (done) return <Redirect to={paths.home} />;

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={handleFireBaseUpload}>
        <div className={classes.row}>
          <TextField
            required
            fullWidth
            id="problem-name"
            label="課題名"
            defaultValue={newProblem.name}
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
            value={newProblem.grade}
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
            defaultValue={newProblem.other}
            onChange={updateProblem}
            variant="outlined"
            name="other"
          />
        </div>
        <div className={classes.row}>
          <img className={classes.image} src={newProblem?.imageURL} alt="" />
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
              style={isEditing ? { display: 'none' } : {}}
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
  );
};

export default ProblemForm;
