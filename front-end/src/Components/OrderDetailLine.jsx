import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fixDecimals } from '../Utils';

function OrderDetailLine(props) {
  const { productIndex, productData } = props;
  return (
    <OrderBody>
      <div>
        <p data-testid="customer_order_details__element-order-table-item-number-<index>">
          { productIndex }
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-name-<index>">
          { productData.name }
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-quantity-<index>">
          { productData.quantity }
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-unit-price-<index>">
          { productData.price }
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-sub-total-<index>">
          { fixDecimals(productData.price * productData.quantity) }
        </p>
      </div>
    </OrderBody>
  );
}

OrderDetailLine.propTypes = {
  productData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  productIndex: PropTypes.number.isRequired,
};

const OrderBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  margin: 5px;
  padding: 0;
  & > div:nth-child(1) {
    width: 50px;
    & > p {
      font-size: 25px;
      font-weight: 500;
      text-align: center;
      border-radius: 8px 0 0 8px;
      background-color: #2FC18C;
      margin: 0;
      padding: 5px 20px;
    }
  }
  & > div:nth-child(2) {
    width:100%;
    & > p {
      font-size: 20px;
      background-color: #EAF1EF;
      text-align: left;
      margin: 0;
      padding: 7.5px 15px;
    }
  }
  & > div:nth-child(3) {
    width: 150px;
    & > p {
      text-align: center;
      font-size: 25px;
      margin: 0;
      padding: 5px;
      background-color: #036B52;
      color: white;
    }
  }
  & > div:nth-child(4) {
    width: 150px;
    & > p {
      text-align: center;
      font-size: 25px;
      margin: 0;
      padding: 5px;
      background-color: #421981;
      color: white;
    }
  }
  & > div:nth-child(5) {
    width: 150px;
    & > p {
      text-align: center;
      font-size: 25px;
      margin: 0;
      padding: 5px;
      background-color: #056CF9;
      color: white;
      border-radius: 0 8px 8px 0;
    }
  }
`;

export default OrderDetailLine;
