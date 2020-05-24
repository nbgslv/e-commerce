import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialTable, { MTablePagination } from 'material-table';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';

const useStyles = makeStyles({
  paper: {
    padding: '20px',
  },
});

const CartItems = ({ data, removeItem }) => {
  const classes = useStyles();

  return (
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
            <TextField
              id="standard-basic"
              type="number"
              value={rowData.quantity}
              onChange={e => {}}
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
};

CartItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  count: PropTypes.number.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  rowsPerPage: PropTypes.number.isRequired,
};

export default CartItems;
