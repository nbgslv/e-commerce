import Paper from '@material-ui/core/Paper';
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withApollo, useMutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { EMPTY_CART } from '../../constants/graphqlConstants';
import { UserContext } from '../../context/UserContext';
import { emptyCart } from '../../utils/localStorage';

const useStyles = makeStyles(theme => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const OrderConfirmed = ({ history }) => {
  const { state, dispatch } = React.useContext(UserContext);
  const [emptyUserCart] = useMutation(EMPTY_CART);
  React.useEffect(() => {
    if (state.user.guest) {
      dispatch({ type: 'EMPTY_CART' });
      emptyCart();
    } else emptyUserCart();
  }, [dispatch, emptyUserCart, state.user.guest]);

  const classes = useStyles();
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography align="center" variant="h6" color="primary">
          Order Confirmed
        </Typography>
        <Typography align="center" variant="subtitle2">
          <strong>Your order number: </strong>
          {Math.floor(Math.random() * 90000) + 10000}
        </Typography>
        <br />
        Thank you for placing your order.
        <br />
        Your order details and receipt were sent to your email address.
        <br />
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={() => history.push('/')}>
            Back To Shopping
          </Button>
        </div>
      </Paper>
    </main>
  );
};

OrderConfirmed.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withApollo(OrderConfirmed);
