import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import { Hidden } from '@material-ui/core';
import { GET_CATEGORIES } from '../../constants/graphqlConstants';

const useStyles = makeStyles(theme => ({}));

const SubHeader = () => {
  const classes = useStyles();

  return <Box display="inline" className={classes.buttonsContainer} />;
};

export default SubHeader;
