import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTablePagination } from 'material-table';
import Input from '@material-ui/core/Input';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import NumericInput from 'react-numeric-input';

const CustomNumericInput = ({ inputRef, ...props }) => {
  return (
    <NumericInput
      {...props}
      style={{
        'input:not(.form-control)': {
          border: 0,
          width: '70px',
          textAlign: 'center',
        },
      }}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      min={1}
      max={50}
    />
  );
};

const CartItems = ({ productsData, removeItem, changeQuantity }) => (
  <MaterialTable
    options={{
      showFirstLastPageButtons: false,
      search: false,
      sorting: false,
      draggable: false,
      emptyRowsWhenPaging: false,
      padding: 'dense',
      pageSizeOptions: [],
      pageSize: 10,
      headerStyle: {
        fontWeight: '800',
      },
      actionsCellStyle: {
        padding: '0 16px',
      },
    }}
    title="Cart Summary"
    columns={[
      { title: 'Product', field: 'title' },
      { title: 'Price', field: 'price' },
      {
        title: 'Quantity',
        field: 'quantity',
        render: rowData => (
          <Input
            value={rowData.quantity}
            onChange={valueAsNumber => changeQuantity(rowData._id, valueAsNumber)}
            inputComponent={CustomNumericInput}
          />
        ),
      },
    ]}
    data={productsData}
    components={{
      Pagination: props => {
        const { count, rowsPerPage } = props;
        if (count % rowsPerPage === count) return null;
        return <MTablePagination {...props} />; // eslint-disable-line
      },
    }}
    actions={[
      {
        icon: () => <RemoveShoppingCartOutlinedIcon color="secondary" />,
        tooltip: 'Remove Item',
        onClick: (event, rowData) => {
          removeItem(rowData._id);
        },
      },
    ]}
  />
);

CartItems.propTypes = {
  productsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
};

export default CartItems;

// TODO add dollar sign to price
