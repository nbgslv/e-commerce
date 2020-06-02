import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Products = ({ products, totalForPayment }) => {
  return (
    <Table aria-label="Products Table">
      <TableHead>
        <TableCell>
          <Typography variant="h6">Product Name</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">Quantity</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">Total Price</Typography>
        </TableCell>
      </TableHead>
      <TableBody>
        {products.map(product => (
          <TableRow key={product._id}>
            <TableCell>{product.title}</TableCell>
            <TableCell align="right">{product.quantity}</TableCell>
            <TableCell align="right">
              {Math.round(product.price * product.quantity * 100) / 100}$
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={1} />
          <TableCell align="right">
            <Typography variant="h6">Total For Payment</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="h6">{totalForPayment}$</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Products;
