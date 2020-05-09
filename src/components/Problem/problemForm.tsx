import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FirebaseContext, UserContext } from 'contexts';
import writeProblem from 'services/write-problem';
import paths from 'paths';
import grades from 'common/grades';
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
    position: 'relative',
  },
  imageInput: {
    display: 'none',
  },
  image: {
    width: '100%',
  },
  hiddenImage: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const ProblemForm: React.FC<{ problem: Problem; pid: string | undefined }> = ({ problem, pid }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [newProblem, setNewProblem] = React.useState<Problem>(problem);
  const [imageAsFile, setImageAsFile] = React.useState<File | undefined>(undefined);
  const isEditing = !!pid;
  const param = isEditing ? '?success=edit' : '?success=create';
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
    const settedGrade = newProblem.grade;
    newProblem.point = grades[settedGrade];
    if (db) {
      writeProblem(db, newProblem, imageAsFile, pid).then(() => {
        setTimeout(() => {
          setDone(true);
        }, 1500);
      });
    }
  };

  const imageContent = isEditing ? (
    <img className={classes.image} src={newProblem?.imageURL} alt="" />
  ) : (
    <input
      required
      className={classes.hiddenImage}
      accept="image/*"
      id="button-file"
      type="file"
      onChange={handleImageAsFile}
      name="image"
    />
  );

  if (done) return <Redirect to={`${paths.home}${param}`} />;

  return (
    <div className={classes.root}>
      <form autoComplete="off" onSubmit={handleFireBaseUpload}>
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
            {Object.keys(grades).map(value => (
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
          {imageContent}
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
