import React from 'react';
import styled from 'styled-components';

function OrderDetailLine() {
  return (
    <OrderBody>
      <div>
        <p data-testid="customer_order_details__element-order-table-item-number-<index>">
          1
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-name-<index>">
          Cerveja Stella 250ml
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-quantity-<index>">
          3
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-unit-price-<index>">
          R$3,50
        </p>
      </div>
      <div>
        <p data-testid="customer_order_details__element-order-table-sub-total-<index>">
          R$10,50
        </p>
      </div>
    </OrderBody>
  );
}

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
