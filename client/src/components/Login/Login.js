import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useMutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { LOGIN_USER } from '../../constants';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '30%',
    margin: '2% auto',
  },
  input: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
}));

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
      return history.push('/');
    }
    return alert('Please provide (valid) authentication details.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <FormControl>
        <TextField
          onChange={e => setUserName(e.target.value)}
          id="email"
          name="email"
          variant="outlined"
          placeholder="Your email"
          margin="normal"
          error={Object.prototype.hasOwnProperty.call(errors, 'email')}
          helperText={
            Object.prototype.hasOwnProperty.call(errors, 'email') ? errors.email.message : ''
          }
          inputProps={{
            className: classes.input,
            ref: register({
              required: 'I think you forgot to fill-in the email field',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Hey! This is not an email address...',
              },
            }),
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          ref={register({ required: true })}
          onChange={e => setPassword(e.target.value)}
          id="password"
          name="password"
          type="password"
          variant="outlined"
          placeholder="Your password"
          margin="normal"
          error={Object.prototype.hasOwnProperty.call(errors, 'password')}
          helperText={
            Object.prototype.hasOwnProperty.call(errors, 'password') ? errors.password.message : ''
          }
          inputProps={{
            className: classes.input,
            ref: register({ required: 'I think you forgot to fill-in the password field' }),
          }}
        />
      </FormControl>
      <Button type="submit" color="primary" variant="contained">
        Login
      </Button>
    </form>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Login;
