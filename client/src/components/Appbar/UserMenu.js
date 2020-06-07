import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
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

const UserMenu = ({ anchorEl, open, onClose, logout }) => {
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
      <MenuItem className={classes.root} onClick={logout}>
        <MeetingRoomOutlinedIcon color="secondary" fontSize="small" />
        &nbsp; Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
