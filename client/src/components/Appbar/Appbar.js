import React from 'react';
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
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);

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
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  disableElevation
                >
                  Sign In
                </Button>
                <Button className={classes.button} variant="outlined" color="secondary">
                  Sign Up
                </Button>
                <IconButton>
                  <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCart fontSize="large" color="secondary" />
                  </StyledBadge>
                </IconButton>
              </>
            )}
            {auth && (
              <IconButton aria-label="account of current user" color="inherit">
                <AccountCircle />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
