import React from 'react';
import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Hidden } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { GET_CATEGORIES } from '../../constants/graphqlConstants';

// TODO show selected category and allow to abort filter on click

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(2),
    padding: '0 32px',
  },
  categories: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  text: {
    margin: '0 8px',
  },
  gridItem: {
    maxHeight: '36px',
    margin: '0 8px',
  },
  filter: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  badge: {
    padding: '0 1% 0 2%',
  },
  link: {
    color: theme.palette.grey['400'],
    fontSize: '1.5rem',
    '-o-transition': '.5s',
    '-ms-transition': '.5s',
    '-moz-transition': '.5s',
    '-webkit-transition': '.5s',
    transition: '.5s',
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  activeCategory: {
    padding: '0 1% 0 2%',
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    margin: theme.spacing(1),
  },
}));

const Filter = ({ limit, client }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  return (
    <div className={classes.container}>
      <div className={classes.categories}>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return loading ? <CircularProgress color="primary" /> : error;
            }

            return data.categories.map(category => {
              const activeClass = id === category._id ? 'activeCategory' : 'link';
              return (
                <Badge
                  key={category._id}
                  className={classes.badge}
                  badgeContent={
                    <IconButton onClick={() => history.push('/')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                  invisible={id !== category._id}
                >
                  <Hidden only={['sm', 'xs']}>
                    <Link
                      component={id === category._id ? 'span' : 'a'}
                      className={classes[activeClass]}
                      variant="body1"
                      href={`/category/${category._id}`}
                      key={category._id}
                    >
                      {category.title}
                    </Link>
                  </Hidden>
                  <Hidden mdUp>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={`/category/${category._id}`}
                      key={category._id}
                      className={classes.buttons}
                    >
                      {category.title}
                    </Button>
                  </Hidden>
                </Badge>
              );
            });
          }}
        </Query>
      </div>
      <div className={classes.filter}>
        <Typography display="inline" variant="h6" color="textSecondary" className={classes.text}>
          Number of products:{' '}
        </Typography>
        <Select
          className={classes.gridItem}
          id="limit"
          value={limit}
          onChange={e => client.writeData({ data: { limit: e.target.value } })}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={64}>64</MenuItem>
        </Select>
      </div>
    </div>
  );
};

Filter.propTypes = {
  limit: PropTypes.number.isRequired,
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(Filter);
