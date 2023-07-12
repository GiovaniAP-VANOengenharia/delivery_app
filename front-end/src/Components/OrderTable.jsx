import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fixDecimals } from '../Utils';

function OrdersTable(props) {
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
    <DetailsContainer>
      <DetailsTableContainer>
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
                  className="card"
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
                  { `R$ ${fixDecimals(price)}` }
                </td>

                <td
                  data-testid={
                    `${role}_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  { `R$ ${fixDecimals(price * quantity)}` }
                </td>
              </tr>
            );
          })}
        </tbody>
      </DetailsTableContainer>
    </DetailsContainer>
  );
}

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 25px;
    text-align: left;
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

const DetailsTableContainer = styled.table`
  width: 100%;
  height: 40px;
  border-spacing: 0 10px;
  border: 1px solid #CBD4D2;
  border-radius: 5px;
  padding: 10px 20px;

  & > tbody > tr > td {
    height: 40px;
  }
  & > tbody > tr > td:nth-child(1) {
    width: 4%;
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    border-radius: 8px 0 0 8px;
    background-color: #2FC18C;
    margin: 0;
    padding: 5px 20px;
  }
  & > tbody > tr > td:nth-child(2) {
    width: 50%;
    font-size: 20px;
    text-align: left;
    border-top: 1px solid #CBD4D2;
    border-bottom: 1px solid #CBD4D2;
    margin: 0;
    padding: 7.5px 15px;
  }
  & > tbody > tr > td:nth-child(3) {
    width: 10%;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #036B52;
    color: white;   
  }
  & > tbody > tr > td:nth-child(4) {
    width: 10%;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #421981;
    color: white;
  }
  & > tbody > tr > td:nth-child(5) {
    width: 10%;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #056CF9;
    border-radius: 0 8px 8px 0;
    color: white;
  }
  & > tbody > tr > td:nth-child(6) {
    width: 15%;
    height: 100%;
    border: 1px solid #2FC18C;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #2FC18C;
    color: white;
    border: none;
  }
  & > tbody > tr > td:nth-child(6) > button {
    width: 20%;
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

OrdersTable.propTypes = {
  sale: PropTypes.shape({
    result: PropTypes.shape({
      cart: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default OrdersTable;
