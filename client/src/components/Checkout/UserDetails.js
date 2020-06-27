import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';

const UserDetails = () => {
  const { state } = React.useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const [firstName, setFirstName] = React.useState(state.user.firstName);
  const [lastName, setLastName] = React.useState(state.user.lastName);
  const [email, setEmail] = React.useState(state.user.email);
  React.useEffect(() => {
    setFirstName(state.user.firstName);
    setLastName(state.user.lastName);
    setEmail(state.user.email);
  }, [state.user.firstName, state.user.lastName, state.user.email]);
  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="subtitle2">Make sure the details are correct:</Typography>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            name="firstName"
            label="First Name"
            value={firstName || ''}
            defaultValue={firstName}
            onChange={e => setFirstName(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            fullWidth
            autoComplete="given-name"
            error={errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            name="lastName"
            value={lastName || ''}
            defaultValue={lastName}
            label="Last Name"
            onChange={e => setLastName(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            fullWidth
            autoComplete="family-name"
            error={errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            name="email"
            label="Email"
            value={email || ''}
            defaultValue={email}
            id="email"
            onChange={e => setEmail(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Oh oh! You must enter a valid email address',
                },
              }),
            }}
            fullWidth
            autoComplete="email"
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
      </Grid>
    </form>
  );
};

UserDetails.propTypes = {};

export default UserDetails;
