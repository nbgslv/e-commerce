import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles(theme => ({
  datePicker: {
    marginTop: '0',
    width: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1) - 2,
  },
}));

const GuestDetails = ({ handleBack, handleNext }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { dispatch } = React.useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const handleDateChange = date => setSelectedDate(date);

  const onSubmit = () => {
    dispatch({
      type: 'SET_GUEST_DETAILS',
      guest: {
        firstName,
        lastName,
        email,
        birthdate: selectedDate,
      },
    });
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            error={errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            error={errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
        </Grid>
        <Grid item md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Birth Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              className={classes.datePicker}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Oh oh! You must enter a valid email',
                },
              }),
            }}
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button className={classes.button} onClick={() => handleBack()}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Submit and Continue
        </Button>
      </div>
    </form>
  );
};

GuestDetails.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default GuestDetails;
