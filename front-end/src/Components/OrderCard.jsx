import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import statusColors from '../Utils/statusColors';

function OrderCard(props) {
  const { sale } = props;
  const { order, orderId, status, date, price } = sale;
  return (
    <OrderContainer>
      <OrderId data-testid={ `customer_orders__element-order-id-${orderId}` }>
        <div>Pedido</div>
        <div>{order}</div>
      </OrderId>
      <OrderStatus
        data-testid={ `customer_orders__element-delivery-status-${orderId}` }
        backgroundColor={ statusColors[status] }
      >
        <div>{status}</div>
      </OrderStatus>
      <OrderDatePrice>
        <div data-testid={ `customer_orders__element-order-date-${orderId}` }>
          {date}
        </div>
        <div data-testid={ `customer_orders__element-card-price-${orderId}` }>
          {price}
        </div>
      </OrderDatePrice>
    </OrderContainer>
  );
}

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  border: 1px solid gray;
  margin: 20px;
`;

const OrderId = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div:nth-child(1) {
    font-size: 15px;
    margin: 0px;
  }; 
  & > div:nth-child(2) {
    font-size: 25px;
    margin: 0px;
  }; 
`;

const OrderStatus = styled.div`
  width: 160px;
  margin: 3px;
  text-align: center;
  border-radius: 10px;
  background: ${(props) => props.backgroundColor};
  & > div {
    font-size: 20px;
    font-weight: 500;
    padding: 30px;
  }
`;

const OrderDatePrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    margin: 2px;
    padding: 2px 10px 2px 10px;
    font-size: 17px;
  }
`;

OrderCard.propTypes = {
  sale: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
