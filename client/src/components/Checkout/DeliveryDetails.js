import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CountryByAbriviation from 'country-json/src/country-by-abbreviation.json';
import postalCodes from 'postal-codes-js';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles(theme => ({
  country: {
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

const DeliveryDetails = ({ handleNext, handleBack }) => {
  const classes = useStyles();

  const [firmName, setFirmName] = React.useState('');
  const [recipientName, setRecipientName] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const { state: userState, dispatch } = React.useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  React.useEffect(() => {
    if (userState.user.address) {
      setFirmName(userState.user.address.firmName);
      setRecipientName(userState.user.address.recipientName);
      setAddress1(userState.user.address.address1);
      setAddress2(userState.user.address.address2);
      setCity(userState.user.address.city);
      setState(userState.user.address.state);
      setZipcode(userState.user.address.zipcode);
      setCountry(userState.user.address.country);
    }
  }, []);

  const onSubmit = () => {
    dispatch({
      type: 'SET_USER_ADDRESS',
      address: {
        firmName,
        recipientName,
        address1,
        address2,
        city,
        state,
        zipcode,
        country,
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
            name="firmName"
            label="Firm Name"
            value={firmName}
            helperText="Optional"
            onChange={e => setFirmName(e.target.value)}
            autoComplete="company"
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            name="recepientName"
            label="Recipient Name *"
            autoComplete="name"
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            error={errors.recepientName}
            helperText={errors.recepientName && errors.recepientName.message}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            fullWidth
            name="address1"
            label="Address 1 *"
            autoComplete="address line 1"
            value={address1}
            onChange={e => setAddress1(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            error={errors.address1}
            helperText={errors.address1 && errors.address1.message}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            fullWidth
            name="address2"
            label="Address 2"
            autoComplete="address line 2"
            value={address2}
            helperText="Optional"
            onChange={e => setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            name="city"
            label="City *"
            autoComplete="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            inputProps={{
              ref: register({
                required: 'Oops! This field is required.',
              }),
            }}
            error={errors.city}
            helperText={errors.city && errors.city.message}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            name="state"
            autoCapitalize="state"
            label="State/Province/Region"
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            disabled={!country}
            name="zipcode"
            label="Zip / Postal code *"
            autoComplete="postal code"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
            helperText={
              // eslint-disable-next-line no-nested-ternary
              country ? errors.zipcode && errors.zipcode.message : 'Please select country first'
            }
            error={errors.zipcode}
            inputProps={{
              ref: register({
                validate: value =>
                  postalCodes.validate(country, value) === true || 'zipcode is not valid',
              }),
            }}
          />
        </Grid>
        <Grid item md={6}>
          <FormControl className={classes.country}>
            <InputLabel>Country *</InputLabel>
            <Select name="country" onChange={e => setCountry(e.target.value)} value={country}>
              {CountryByAbriviation.map(country => (
                <MenuItem key={country.abbreviation} value={country.abbreviation}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button className={classes.button} onClick={() => handleBack()}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Next
        </Button>
      </div>
    </form>
  );
};

DeliveryDetails.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

// TODO clean code and PropTypes
// TODO change containers to classes?

export default DeliveryDetails;
