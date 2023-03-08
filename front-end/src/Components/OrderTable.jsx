import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fixDecimals } from '../Utils';

function SellerOrdersTable(props) {
  const [cart, setCart] = useState([]);
  const { sale, role } = props;
  const tableHeaders = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

  const fetchProducts = async () => {
    setCart(sale.result.cart);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          { tableHeaders.map((header) => (
            <th key={ header }>{ header }</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { cart.map((product, index) => {
          const { name, price, quantity } = product;

          return (
            <tr key={ name }>
              <td
                data-testid={
                  `${role}_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1 }
              </td>

              <td
                data-testid={
                  `${role}_order_details__element-order-table-name-${index}`
                }
              >
                { name }
              </td>

              <td
                data-testid={
                  `${role}_order_details__element-order-table-quantity-${index}`
                }
              >
                { quantity }
              </td>

              <td
                data-testid={
                  `${role}_order_details__element-order-table-unit-price-${index}`
                }
              >
                { fixDecimals(price) }
              </td>

              <td
                data-testid={
                  `${role}_order_details__element-order-table-sub-total-${index}`
                }
              >
                { fixDecimals(price * quantity) }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

SellerOrdersTable.propTypes = {
  sale: PropTypes.shape({
    result: PropTypes.shape({
      cart: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export default SellerOrdersTable;
