import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  media: {
    width: '350px',
    height: '350px',
  },
  content: {
    paddingBottom: '0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
  },
  buttons: {
    height: '50px',
  },
});

const SkeletonProducts = () => {
  const classes = useStyles();

  return (
    <>
      {Array(4)
        .fill()
        .map((data, id) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item md={3} key={id}>
            <Card>
              <Skeleton animation="wave" variant="rect" className={classes.media} />
              <CardContent className={classes.content}>
                <Skeleton animation="wave" variant="text" />
                <Skeleton animation="wave" variant="text" />
              </CardContent>
              <CardActions className={classes.actions}>
                <Skeleton animation="wave" variant="rect" className={classes.buttons} />
                <Skeleton animation="wave" variant="rect" className={classes.buttons} />
              </CardActions>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default SkeletonProducts;
