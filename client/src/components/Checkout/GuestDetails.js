import Button from '@material-ui/core/Button';
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const GuestDetails = ({ handleBack, handleNext }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState();
  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const handleDateChange = date => setSelectedDate(date);

  const onSubmit = () => handleNext();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ with: '680px' }}>
        <Grid item md={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <TextField
              name="firstName"
              variant="outlined"
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
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <TextField
              name="lastName"
              variant="outlined"
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
          </FormControl>
        </Grid>
        <Grid item md={7}>
          <FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Birth Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
        <Grid item md={5}>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <TextField
              name="email"
              variant="outlined"
              value={email}
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
              error={errors.email}
              helperText={errors.email && errors.email.message}
            />
          </FormControl>
        </Grid>
        <Button onClick={() => handleBack()} className={classes.button}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit and Continue
        </Button>
      </Grid>
    </form>
  );
};

export default GuestDetails;
