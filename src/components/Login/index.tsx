import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContainer from 'containers/Auth/AuthContainer';
import { FirebaseContext } from 'contexts';
import paths from 'paths';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const { auth } = useContext(FirebaseContext);
  const [values, setValues] = useState({ email: '', password: '' });
  const history = useHistory();

  const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const loginWithEmailAndPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password);
        history.replace(paths.home);
      } catch (error) {
        console.log('Signup error', error);
      }
    }
  };

  return (
    <AuthContainer>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>
      <form className={classes.form} onSubmit={loginWithEmailAndPassword}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          value={values.email}
          autoComplete="email"
          onChange={updateValues}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="パスワード"
          type="password"
          id="password"
          value={values.password}
          autoComplete="current-password"
          onChange={updateValues}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          ログインする
        </Button>
      </form>
      <Link to={paths.signup}>新規登録はこちらから</Link>
    </AuthContainer>
  );
};

export default Login;
