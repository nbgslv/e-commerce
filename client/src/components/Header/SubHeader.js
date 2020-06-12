import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import { GET_CATEGORIES } from '../../constants';

const useStyles = makeStyles(theme => ({
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
}));

const SubHeader = () => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  return (
    <Box display="inline">
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
                <Link
                  component={id === category._id ? 'span' : 'a'}
                  className={classes[activeClass]}
                  variant="body1"
                  href={`/category/${category._id}`}
                  key={category._id}
                >
                  {category.title}
                </Link>
              </Badge>
            );
          });
        }}
      </Query>
    </Box>
  );
};

SubHeader.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default SubHeader;
