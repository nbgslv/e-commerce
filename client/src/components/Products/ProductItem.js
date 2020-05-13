import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { ADD_RATING } from '../../constants';
// TODO add to cart action - move to here

const useStyles = makeStyles({
  media: {
    width: '350px',
  },
  content: {
    paddingBottom: '0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const ProductItem = ({ data }) => {
  const [imageLoading, setImageLoading] = React.useState(true);
  const classes = useStyles();
  return (
    <Card>
      {imageLoading && (
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.media}
          style={{ height: '350px' }}
        />
      )}
      <img
        onLoad={() => setImageLoading(false)}
        src={data.thumbnail}
        className={classes.media}
        alt={data.title}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6" align="center">
          {data.title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" align="center" color="primary">
          {data.price}$
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Mutation mutation={ADD_RATING}>
          {updateProductRating => (
            <Rating
              name="simple-controlled"
              size="small"
              value={3}
              onChange={(e, newValue) =>
                updateProductRating({ variables: { id: data.id, rating: newValue } })
              }
            />
          )}
        </Mutation>
        <Button productId={data.id}>+ Add to cart</Button>
      </CardActions>
    </Card>
  );
};

ProductItem.propTypes = {
  data: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
