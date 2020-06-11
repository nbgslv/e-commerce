import React from 'react';
import { useQuery, useMutation, useSubscription } from 'react-apollo';
import Cookies from 'js-cookie';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { EMPTY_CART, LOGOUT_USER, GET_USER, CART_CHANGED } from '../../constants';
import { SnackbarContext } from '../../context/snackbarContext';
import { UserContext } from '../../context/UserContext';
import { getUser, emptyCart as emptyLocalCart, getCart, setCart } from '../../utils/localStorage';
import CustomDialog from '../Dialog/CustomDialog';
import CartMenu from './CartMenu';
import UserMenu from './UserMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    padding: '5px',
    margin: '5px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Appbar = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const { dispatch: snackbarDispatch } = React.useContext(SnackbarContext);
  const { loading, data } = useQuery(GET_USER);
  const { data: updatedCart, loading: cartItemAddedLoading } = useSubscription(CART_CHANGED);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (getUser()) {
      if (!cartItemAddedLoading && updatedCart)
        dispatch({
          type: 'UPDATE_CART',
          cart: updatedCart,
        });
      else if (!loading && data) dispatch({ type: 'SET_USER', user: data.getUser });
    } else {
      if (!getCart()) setCart(true);
      dispatch({ type: 'SET_GUEST' });
      Cookies.remove('signedin');
    }
  }, [data, loading, updatedCart, cartItemAddedLoading, state.user.guest]);
  // TODO add loading figure to user appbar right side

  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();

  const handleCartMenuOpen = e => {
    setAnchorElCart(e.currentTarget);
  };

  const handleCartMenuClose = () => {
    setAnchorElCart(null);
  };

  const handleUserMenuOpen = e => {
    setAnchorElUser(e.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUser(null);
  };

  const [emptyCart] = useMutation(EMPTY_CART);

  const handleEmptyCart = () => {
    handleCartMenuClose();
    setDialogOpen(true);
  };

  const handleDialogOnClose = async button => {
    setDialogOpen(false);
    if (button === 'right') {
      if (getUser()) await emptyCart();
      else {
        emptyLocalCart();
        dispatch({ type: 'EMPTY_CART' });
      }
      snackbarDispatch({ type: 'SET_EMPTY_CART_SUCCESS_ON' });
    }
  };

  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = () => {
    handleUserMenuClose();
    const logoutSuccess = logoutUser();
    if (logoutSuccess) {
      Cookies.remove('signedin');
      dispatch({ type: 'REMOVE_USER' });
      snackbarDispatch({ type: 'SET_LOGOUT_SUCCESS_ON' });
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          <div>
            {state.user.guest && (
              <>
                <Button
                  href="/login/"
                  className={classes.button}
                  color="secondary"
                  disableElevation
                >
                  Login
                </Button>
                <Button className={classes.button} variant="outlined" color="secondary">
                  Sign Up
                </Button>
              </>
            )}
            {!state.user.guest && (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleUserMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" color="secondary" />
                </IconButton>
                <UserMenu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleUserMenuClose}
                  logout={handleLogout}
                />
              </>
            )}
            <IconButton
              edge="end"
              aria-label="shopping cart"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleCartMenuOpen}
            >
              <StyledBadge badgeContent={state.user.cart.total} color="secondary">
                <ShoppingCart fontSize="large" color="secondary" />
              </StyledBadge>
            </IconButton>
            <CartMenu
              anchorEl={anchorElCart}
              open={Boolean(anchorElCart)}
              onClose={handleCartMenuClose}
              emptyCart={handleEmptyCart}
            />
          </div>
        </Toolbar>
      </AppBar>
      <CustomDialog
        rightButtonLabel="Empty Cart"
        open={dialogOpen}
        onCloseHandler={handleDialogOnClose}
        message="Are you sure you wish to empty the cart?"
        leftButtonLabel="Cancel"
        title="Empty Cart"
      />
    </div>
  );
};

export default Appbar;
