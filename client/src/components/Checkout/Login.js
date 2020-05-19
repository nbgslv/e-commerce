import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useMutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { LOGIN_USER } from '../../constants';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '30%',
    margin: ' 2% auto',
  },
  input: {
    marginBottom: '8px',
  },
});

const Login = ({ history }) => {
  const classes = useStyles();
  const [loginUser] = useMutation(LOGIN_USER);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    const { data } = await loginUser({
      variables: { username: userName, password },
    });

    if (data.loginUser && data.loginUser.token) {
      sessionStorage.setItem('token', data.loginUser.token);
      return history.push('/checkout');
    }
    return alert('Please provide (valid) authentication details.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextField
        name="email"
        id="email"
        variant="outlined"
        onChange={e => setUserName(e.target.value)}
        placeholder="Your email"
        className={classes.input}
        inputProps={{
          ref: register({
            required: 'Oops! This field is required.',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Oh oh! You must enter a valid email address',
            },
          }),
        }}
        error={errors.email}
        helperText={errors.email && errors.email.message}
      />
      <TextField
        name="password"
        id="password"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Your password"
        className={classes.input}
        inputProps={{
          ref: register({
            required: 'Oops! This field is required.',
          }),
        }}
        error={errors.password}
        helperText={errors.password && errors.password.message}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Login;
