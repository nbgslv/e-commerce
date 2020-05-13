import React from 'react';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { GET_CATEGORIES } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 1% 0 2%',
    color: theme.palette.grey['400'],
    fontSize: '1rem',
    '-o-transition': '.5s',
    '-ms-transition': '.5s',
    '-moz-transition': '.5s',
    '-webkit-transition': '.5s',
    transition: '.5s',
    '&:first-child': {
      paddingLeft: theme.spacing(6),
    },
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

const SubHeader = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      {history}
      <Box>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return loading ? 'Loading...' : error;
            }
            return data.categories.map(category => (
              <Link
                className={classes.root}
                component="button"
                variant="body1"
                herf={`/products/category/${category.id}`}
                key={category.id}
              >
                {category.title}
              </Link>
            ));
          }}
        </Query>
      </Box>
    </>
  );
};

export default SubHeader;
