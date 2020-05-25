import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ShopIcon from '@material-ui/icons/Shop';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    padding: '0 1% 0 2%',
    color: theme.palette.grey['400'],
    '-o-transition': '.5s',
    '-ms-transition': '.5s',
    '-moz-transition': '.5s',
    '-webkit-transition': '.5s',
    transition: '.5s',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  list: {
    '& > li': {
      padding: '8px 12px 6px 4px',
    },
  },
}));

const CartMenu = ({ anchorEl, open, onClose, emptyCart }) => {
  const classes = useStyles();

  return (
    <Menu
      classes={{ list: classes.list }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      // id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      <MenuItem className={classes.root}>
        <Link to="/cart" className={classes.root}>
          View Cart
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem className={classes.root}>
        <ShopIcon color="primary" fontSize="small" />
        &nbsp; Purchase
      </MenuItem>
      <MenuItem className={classes.root} onClick={emptyCart}>
        <RemoveShoppingCartOutlinedIcon color="primary" fontSize="small" />
        &nbsp; Empty Cart
      </MenuItem>
    </Menu>
  );
};

export default CartMenu;
