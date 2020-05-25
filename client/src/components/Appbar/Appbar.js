import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
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
import { EMPTY_CART, GET_CART } from '../../constants';
import { getCart, getUser, setCart, emptyCart as emptyLocalCart } from '../../utils/localStorage';
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

const Appbar = ({ updateEmptyLocalCart }) => {
  let auth = false;
  let cartTotal = 0;
  const { loading, errors, data } = useQuery(GET_CART);
  if (data && !errors && !loading) {
    auth = true;
    cartTotal = data.cart.total;
  } else {
    auth = false;
    cartTotal = getCart() ? getCart().total : setCart(true);
  }

  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();

  const handleCartMenuOpen = e => {
    setAnchorElCart(e.currentTarget);
  };

  const handleCartMenuClose = e => {
    setAnchorElCart(null);
  };

  const handleUserMenuOpen = e => {
    setAnchorElUser(e.currentTarget);
  };

  const handleUserMenuClose = e => {
    setAnchorElUser(null);
  };

  const [emptyCart] = useMutation(EMPTY_CART);

  const handleEmptyCart = async () => {
    if (getUser()) await emptyCart({ refetchQueries: [{ query: GET_CART }] });
    else {
      emptyLocalCart();
      cartTotal = 0;
      updateEmptyLocalCart();
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
            {!auth && (
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
            {auth && (
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
              <StyledBadge badgeContent={cartTotal} color="secondary">
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
    </div>
  );
};

export default Appbar;
