import React from 'react';
import { fixDecimals } from '../Utils';
import { cartProductsMock } from '../Utils/checkoutPageMocks';

function SellerOrdersTable() {
  const orderProducts = cartProductsMock;
  const tableHeaders = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

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
        { orderProducts.map((product, index) => {
          const { name, price, quantity } = product;

          return (
            <tr key={ name }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1 }
              </td>

              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index}`
                }
              >
                { name }
              </td>

              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                { quantity }
              </td>

              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                { fixDecimals(price) }
              </td>

              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
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

export default SellerOrdersTable;
