import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useMutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { saveUser } from '../../utils/localStorage';
import { GET_CART, GET_USER, LOGIN_USER } from '../../constants/graphqlConstants';
import CustomSnackbar from '../Snackbar/CustomSnackbar';

const useStyles = makeStyles(theme => ({
  form: {
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '40%',
    margin: ' 2% auto',
  },
  input: {
    marginBottom: '8px',
  },
}));

const Login = ({ history, loginSuccess }) => {
  const classes = useStyles();
  const [loginUser] = useMutation(LOGIN_USER);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    const { data } = await loginUser({
      variables: { email, password },
      errorPolicy: 'all',
      refetchQueries: [{ query: GET_CART }, { query: GET_USER }],
    });
    if (data.loginUser) {
      if (data.loginUser.success) {
        saveUser();
        loginSuccess();
        return history.goBack();
      }
    } else {
      setMessage('Login failed. Please make sure the email address and password are correct');
      setSeverity('error');
      setOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextField
        name="email"
        id="email"
        variant="outlined"
        onChange={e => setEmail(e.target.value)}
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
      <CustomSnackbar message={message} severity={severity} open={open} />
      {/* Demo hint login details */}
      <br />
      <Box textAlign="center">
        <Typography variant="body1" color="textSecondary" style={{ fontSize: '0.75rem' }}>
          For demo purposes, use the following login details: <br />
          Email: test@test.com <br />
          Password: test
        </Typography>
      </Box>
    </form>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  loginSuccess: PropTypes.func.isRequired,
};

export default Login;

// TODO don't allow access after login
