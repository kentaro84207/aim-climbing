import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContainer from 'containers/Auth/AuthContainer';
import writeUser from 'services/write-user';
import { FirebaseContext, UserContext } from 'contexts';
import paths from 'paths';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup: React.FC = () => {
  const classes = useStyles();
  const { auth, db } = useContext(FirebaseContext);
  const { setCredential } = useContext(UserContext);
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [errorTexts, setErrorTexts] = useState({ email: '', password: '' });
  const history = useHistory();

  const validationEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const invalid = !reg.test(value);
    const text = invalid ? 'メールの形式が違います' : '';
    setErrors({ ...errors, email: invalid });
    setErrorTexts({ ...errorTexts, email: text });
  };

  const validationPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const invalid = value.length < 6;
    const text = invalid ? '6文字以上で登録してください' : '';
    setErrors({ ...errors, password: invalid });
    setErrorTexts({ ...errorTexts, password: text });
  };

  const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'password') validationPassword(e);
    if (e.target.name === 'email') validationEmail(e);
  };

  const signupWithEmailAndPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth && db) {
      try {
        const credential = await auth.createUserWithEmailAndPassword(values.email, values.password);
        if (!credential || !credential.user) return;
        const id = credential.user.uid;
        setCredential(credential);
        await writeUser(db, id, values.name);
        history.replace(paths.home);
      } catch (error) {
        console.log('Signup error', error);
      }
    }
  };

  return (
    <AuthContainer>
      <Typography component="h1" variant="h5">
        新規登録
      </Typography>
      <form className={classes.form} onSubmit={signupWithEmailAndPassword}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="ニックネーム"
          name="name"
          value={values.name}
          autoComplete="name"
          autoFocus
          onChange={updateValues}
        />
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
          error={errors.email}
          helperText={errorTexts.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="パスワード(6文字以上)"
          type="password"
          id="password"
          value={values.password}
          autoComplete="current-password"
          onChange={updateValues}
          error={errors.password}
          helperText={errorTexts.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          登録する
        </Button>
      </form>
      <Link to={paths.login}>アカウントがある方はこちらからログイン</Link>
    </AuthContainer>
  );
};

export default Signup;
