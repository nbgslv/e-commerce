import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import Rating from 'material-ui-rating';
import { ADD_RATING, ADD_TO_CART } from '../../constants';
import { UserContext } from '../../context/UserContext';
import { getUser, addProductToCart } from '../../utils/localStorage';

const useStyles = makeStyles({
  root: {
    maxWidth: '350px',
  },
  ratingIconButton: {
    padding: '4px',
  },
  media: {
    width: '350px',
  },
  content: {
    paddingBottom: '0',
    whiteSpace: 'no-wrap',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const ProductItem = ({ data }) => {
  const { state, dispatch } = React.useContext(UserContext);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [rating, setRating] = React.useState(Math.round(data.voters / data.rating));
  const [hover, setHover] = React.useState(false);
  const auth = Boolean(getUser());

  const classes = useStyles();
  return (
    <Card className={classes.root}>
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
        <Mutation
          mutation={ADD_RATING}
          update={(cache, { data: { updateProductRating } }) => {
            return setRating(Math.round(updateProductRating.voters / updateProductRating.rating));
          }}
        >
          {(updateProductRating, { called }) => (
            <Rating
              classes={{ iconButton: classes.ratingIconButton }}
              value={rating}
              onChange={value => {
                if (!called) {
                  updateProductRating({
                    variables: { id: data.id, rating: value },
                  });
                }
              }}
            />
          )}
        </Mutation>
        <Mutation mutation={ADD_TO_CART} ignoreResults={false}>
          {addToCart => (
            <Button
              productId={data.id}
              variant="outlined"
              color="primary"
              onClick={async () => {
                if (!state.user.guest) {
                  await addToCart({
                    variables: { productId: data._id },
                  });
                } else {
                  const productAdded = addProductToCart(data);
                  dispatch({ type: 'ADD_PRODUCT_TO_CART', product: productAdded });
                }
              }}
              onMouseEnter={() => setHover(true)}
              onMouseOver={e => e.stopPropagation()}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
            >
              {hover && (
                <Fade in={hover} timeout={1000}>
                  <AddShoppingCartIcon />
                </Fade>
              )}{' '}
              ADD TO CART
            </Button>
          )}
        </Mutation>
      </CardActions>
    </Card>
  );
};

ProductItem.propTypes = {
  data: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    voters: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;

// TODO media query for rating and add to user button
