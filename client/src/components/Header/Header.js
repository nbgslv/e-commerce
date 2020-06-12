import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HeaderBgImg from './header-bg.png';

const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: 'auto',
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  buttonsContainer: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: '0 8px',
  },
}));

const HeaderBg = () => {
  return <img src={HeaderBgImg} alt="Header" style={{ width: '100%' }} />;
};

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainFeaturedPost}>
      <Grid item md={6} classes={{ item: classes.gridItem }}>
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h1" variant="h3" color="primary" gutterBottom>
            Summer Is Kicking
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. In cursus turpis massa tincidunt dui ut
            ornare.
          </Typography>
          <Box className={classes.buttonsContainer}>
            <Button className={classes.button} variant="contained" color="primary">
              Go Shopping
            </Button>
            <Button className={classes.button} variant="outlined" color="primary">
              New Comings
            </Button>
          </Box>
        </div>
      </Grid>
      <Grid item md={6}>
        <HeaderBg />
      </Grid>
    </Grid>
  );
};

export default Header;
