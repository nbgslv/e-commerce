import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import HeaderBgImg from './header-bg.png';

const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: 'auto',
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
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
}));

const HeaderBg = () => {
  return <img src={HeaderBgImg} alt="Header" style={{ width: '100%' }} />;
};

const Header = props => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid container className={classes.mainFeaturedPost}>
      <Grid item md={6} classes={{ item: classes.gridItem }}>
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {post.description}
          </Typography>
          <Link variant="subtitle1" href="#">
            {post.linkText}
          </Link>
        </div>
      </Grid>
      <Grid item md={6}>
        <HeaderBg />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  post: PropTypes.object,
};

Header.defaultProps = {
  post: {
    imageText: HeaderBg,
    title: 'shopping',
    description: 'the place to shop',
    linkText: '',
  },
};

export default Header;
