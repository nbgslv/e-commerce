import React from 'react';
import { useQuery } from 'react-apollo';
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
import { GET_USER } from '../../constants';
import { getUser } from '../../utils/localStorage';
import { appContext } from '../App';

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
  const { loading, errors, data } = useQuery(GET_USER, { variables: { token: getUser() } });
  const { auth, setAuth, setUserId, cart, setCart } = React.useContext(appContext);
  React.useEffect(() => {
    if (!errors && !loading && data) {
      if (data.user) {
        setAuth(true);
        setUserId(data.user._id);
        if (auth && data.user.cart.total > cart.total) setCart(data.user.cart);
      }
    }
    if (!auth && localStorage.getItem('cart')) setCart(JSON.parse(localStorage.getItem('cart')));
    else if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify({ total: 0, products: [] }));
      setCart(JSON.stringify({ total: 0, products: [] }));
    }
  }, [auth, setAuth, setCart, setUserId, data, errors, loading, cart.total]);

  const classes = useStyles();

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
              <IconButton aria-label="account of current user" color="inherit">
                <AccountCircle fontSize="large" color="secondary" />
              </IconButton>
            )}
            <IconButton>
              <StyledBadge badgeContent={cart.total} color="secondary">
                <ShoppingCart fontSize="large" color="secondary" />
              </StyledBadge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
