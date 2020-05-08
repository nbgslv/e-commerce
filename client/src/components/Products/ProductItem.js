import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddToCartButton from '../Cart/AddToCartButton';

const ProductItemWrapper = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  text-decoration: none;
`;

const Title = styled.h3`
  margin-left: 2%;
`;

const Thumbnail = styled.img`
  border-radius: 5px;
`;

const ProductItem = ({ data }) => (
  <ProductItemWrapper>
    <Thumbnail src={data.thumbnail} width={200} />
    <Title>{data.title}</Title>
    <AddToCartButton productId={data.id} />
  </ProductItemWrapper>
);

ProductItem.propTypes = {
  data: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
