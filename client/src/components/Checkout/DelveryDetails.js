import Button from '@material-ui/core/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CountryByAbriviation from 'country-json/src/country-by-abbreviation.json';
import postalCodes from 'postal-codes-js';

const DelveryDetails = ({ handleNext, handleBack, setAdrress }) => {
  const [firmName, setFirmName] = React.useState('');
  const [recipientName, setRecipientName] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    setAdrress({
      firmName,
      recipientName,
      address1,
      address2,
      country,
      city,
      zipcode,
    });
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <FormControl>
            <FormLabel>Firm Name</FormLabel>
            <TextField
              name="firmName"
              value={firmName}
              helperText="Optional"
              onChange={e => setFirmName(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <FormControl>
            <FormLabel>Recipient Name</FormLabel>
            <TextField
              name="recepientName"
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
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <FormControl>
            <FormLabel>Address 1</FormLabel>
            <TextField
              name="address1"
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
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <FormControl>
            <FormLabel>Address 2</FormLabel>
            <TextField
              name="address2"
              value={address2}
              helperText="Optional"
              onChange={e => setAddress2(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select name="country" onChange={e => setCountry(e.target.value)} value={country}>
              {CountryByAbriviation.map(country => (
                <option key={country.abbreviation} value={country.abbreviation}>
                  {country.country}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl>
            <FormLabel>City</FormLabel>
            <TextField
              name="city"
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
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <TextField
              disabled={!country}
              name="zipcode"
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
          </FormControl>
        </Grid>
      </Grid>
      <Button onClick={() => handleBack()}>Back</Button>
      <Button type="submit" variant="contained" color="primary">
        Submit and Continue
      </Button>
    </form>
  );
};

export default DelveryDetails;
