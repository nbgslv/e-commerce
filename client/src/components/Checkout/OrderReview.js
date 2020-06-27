import marked from 'marked';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import { UserContext } from '../../context/UserContext';
import { computeTotal, countryAbbrToName } from '../../utils/cart';

const useStyles = makeStyles({
  gridHeadline: {
    margin: '16px',
  },
  gridItem: {
    marginLeft: '24px',
  },
});

const OrderReview = ({ setNextButton }) => {
  const classes = useStyles();
  const { state } = React.useContext(UserContext);
  const [totalForPayment, setTotalForPayment] = React.useState(0);
  const [termsAndConditions, setTermsAndConditions] = React.useState();
  const [terms, setTerms] = React.useState(false);

  React.useEffect(() => {
    if (terms) setNextButton(true);
    else setNextButton(false);
  }, [terms, setTerms]);

  const getTermsAndConditions = () => {
    const mdFile = require('./temsandconditions.md');
    fetch(mdFile)
      .then(res => res.text())
      .then(text => setTermsAndConditions(marked(text)))
      .catch(console.log);
  };

  React.useEffect(() => getTermsAndConditions(), []);

  React.useEffect(() => setTotalForPayment(computeTotal(state.user.cart.products)), [
    state.user.cart.total,
    state.user.cart.products,
  ]);

  return (
    <>
      <Table aria-label="OrderReview Table">
        <TableHead>
          <TableCell>
            <Typography variant="subtitle1">
              <strong>Product Name</strong>
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle1">
              <strong>Quantity</strong>
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle1">
              <strong>Total Price</strong>
            </Typography>
          </TableCell>
        </TableHead>
        <TableBody>
          {state.user.cart.products.map(product => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">
                {Math.round(product.price * product.quantity * 100) / 100}$
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1} />
            <TableCell align="right">
              <Typography variant="subtitle1" color="primary">
                <strong>Total For Payment</strong>
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                <strong>{totalForPayment}$</strong>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="subtitle1" className={classes.gridHeadline}>
            <strong>User Details</strong>
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Email:</strong>
            &nbsp;
            {state.user.email}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Name:</strong>
            &nbsp;
            {state.user.firstName} {state.user.lastName}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="subtitle1" className={classes.gridHeadline}>
            <strong>Shipping Address</strong>
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Firm Name:</strong>
            &nbsp;
            {state.user.address.firmName}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Recipient Name:</strong>
            &nbsp;
            {state.user.address.recipientName}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Address:</strong>
            &nbsp;
            {state.user.address.address1} {state.user.address.address2}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>City:</strong>
            &nbsp;
            {state.user.address.city}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>State/Province/Region:</strong>
            &nbsp;
            {state.user.address.state}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Zip / Postal code:</strong>
            &nbsp;
            {state.user.address.zipcode}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle2" className={classes.gridItem}>
            <strong>Country:</strong>
            &nbsp;
            {countryAbbrToName(state.user.address.country)}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="subtitle1" className={classes.gridHeadline}>
            <strong>Terms & Conditions</strong>
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={12} className={classes.gridItem}>
          <div
            dangerouslySetInnerHTML={{ __html: termsAndConditions }}
            style={{ width: '100%', maxHeight: '400px', overflowY: 'scroll' }}
          />
        </Grid>
        <Grid item md={12} className={classes.gridItem}>
          <FormControlLabel
            control={
              <Checkbox
                checked={terms}
                onChange={e => setTerms(e.target.checked)}
                color="primary"
              />
            }
            label="I agree to the terms above"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderReview;
