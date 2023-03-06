import React, { useContext } from 'react';
import { calcCartTotal, fixDecimals } from '../Utils';
import MyContext from '../Context/MyContext';

function CheckoutTable() {
  const { cart, setCart } = useContext(MyContext);

  const totalValue = fixDecimals(calcCartTotal(cart));

  const removeItem = (id) => {
    const products = localStorage.getItem('products');
    let items = [];
    let findItem = '';
    if (products) {
      items = JSON.parse(products);
      findItem = items.find((product) => product.id === id);
    }
    if (findItem) {
      const newCart = items.filter((product) => product.id !== id);
      if (!newCart.length) localStorage.removeItem('products');
      else {
        const toLocalStorage = JSON.stringify(newCart);
        localStorage.setItem('products', toLocalStorage);
      }
      setCart(newCart);
    }
  };

  const tableHeaders = [
    'Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  return (
    <>
      <table>
        <thead>
          <tr>
            { tableHeaders.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { cart.map((product, index) => {
            const { name, price, quantity } = product;

            return (
              <tr key={ name }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>

                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { name }
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { price.toString().replace('.', ',')}
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {fixDecimals(quantity * price).replace('.', ',')}
                </td>

                <td>
                  <button
                    type="button"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    onClick={ () => removeItem(product.id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>

            );
          }) }
        </tbody>
      </table>

      <div data-testid="customer_checkout__element-order-total-price">
        { totalValue.toString().replace('.', ',') }
      </div>
    </>
  );
}

export default CheckoutTable;
