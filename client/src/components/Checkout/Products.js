import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Products = ({ products, totalForPayment }) => {
  return (
    <Table aria-label="Products Table">
      <TableHead>
        <TableCell>Product Name</TableCell>
        <TableCell align="right">Quantity</TableCell>
        <TableCell align="right">Total Price</TableCell>
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
          <TableCell align="right">Total For Payment</TableCell>
          <TableCell align="right">{totalForPayment}$</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Products;
