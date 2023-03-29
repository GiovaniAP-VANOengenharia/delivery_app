import React, { useContext } from 'react';
import styled from 'styled-components';
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
    <CheckoutContainer>
      <p>Finalizar Pedido</p>
      <CheckoutTableContainer>
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
                  className="card"
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
                  { `R$ ${price.toString().replace('.', ',')}`}
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${fixDecimals(quantity * price).replace('.', ',')}`}
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
      </CheckoutTableContainer>
      <div>
        <p className="price">Total: R$</p>
        <div data-testid="customer_checkout__element-order-total-price">
          { totalValue.toString().replace('.', ',') }
        </div>
      </div>
    </CheckoutContainer>
  );
}

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > p {
    font-size: 25px;
    text-align: left;
    width: 90%;
  }
  .price {
    font-size: 25px;
    text-align: left;
    width: 61%;
    color: white;
    margin: 0 10px;
  }
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    margin-left: 67%;
    margin-bottom: 20px;
    background-color: #036B52;
    border: 1px solid #036B52;
    color: white;
    padding: 10px;
    height: 30px;
    border-radius: 8px;
  }
  `;

const CheckoutTableContainer = styled.table`
  width: 90%;
  height: 40px;
  border-spacing: 0 10px;
  margin: 10px;
  border: 1px solid #CBD4D2;
  border-radius: 8px;
  padding: 10px 20px;

  & > tbody > tr > td {
    height: 40px;
  }
  & > tbody > tr > td:nth-child(1) {
    width: 40px;
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    border-radius: 8px 0 0 8px;
    background-color: #2FC18C;
    margin: 0;
    padding: 5px 20px;
  }
  & > tbody > tr > td:nth-child(2) {
    width: 500px;
    font-size: 20px;
    text-align: left;
    border-top: 1px solid #CBD4D2;
    border-bottom: 1px solid #CBD4D2;
    margin: 0;
    padding: 7.5px 15px;
  }
  & > tbody > tr > td:nth-child(3) {
    width: 100px;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #036B52;
    color: white;   
  }
  & > tbody > tr > td:nth-child(4) {
    width: 100px;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #421981;
    color: white;
  }
  & > tbody > tr > td:nth-child(5) {
    width: 100px;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #056CF9;
    color: white;
  }
  & > tbody > tr > td:nth-child(6) {
    width: 150px;
    height: 100%;
    border: 1px solid #2FC18C;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #2FC18C;
    border-radius: 0 8px 8px 0;
    color: white;
    border: none;
  }
  & > tbody > tr > td:nth-child(6) > button {
    width: 200px;
    height: 100%;
    border: 1px solid #2FC18C;
    text-align: center;
    font-size: 20px;
    margin: 0;
    padding: 5px;
    background-color: #2FC18C;
    color: white;
    border: none;
  }
`;

export default CheckoutTable;
