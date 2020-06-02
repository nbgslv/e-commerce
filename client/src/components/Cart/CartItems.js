import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTablePagination } from 'material-table';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import NumericInput from 'react-numeric-input';

const CartItems = ({ data, removeItem, changeQuantity }) => (
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
          <NumericInput
            min={1}
            max={50}
            value={rowData.quantity}
            onChange={valueAsNumber => changeQuantity(rowData._id, valueAsNumber)}
          />
        ),
      },
    ]}
    data={data}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  count: PropTypes.number.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  rowsPerPage: PropTypes.number.isRequired,
};

export default CartItems;
