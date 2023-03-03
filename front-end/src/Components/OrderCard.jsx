import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import statusColors from '../Utils/statusColors';

function OrderCard(props) {
  const { sale } = props;
  const { id, totalPrice, saleDate, status } = sale;
  const orderIdMaxLength = 4;
  return (
    <OrderContainer>
      <OrderId data-testid={ `customer_orders__element-order-id-${id}` }>
        <div>Pedido</div>
        <div>{id.toString().padStart(orderIdMaxLength, '0')}</div>
      </OrderId>
      <OrderStatus
        data-testid={ `customer_orders__element-delivery-status-${id}` }
        backgroundColor={ statusColors[status] }
      >
        <div>{status}</div>
      </OrderStatus>
      <OrderDatePrice>
        <div data-testid={ `customer_orders__element-order-date-${id}` }>
          {saleDate}
        </div>
        <div data-testid={ `customer_orders__element-card-price-${id}` }>
          {`R$ ${totalPrice.toString().replace('.', ',')}`}
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
  width: 190px;
  margin: 3px;
  text-align: center;
  border-radius: 10px;
  background: ${(props) => props.backgroundColor};
  & > div {
    font-size: 20px;
    font-weight: 500;
    padding: 30px 0 30px 0;
  }
`;

const OrderDatePrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    margin: 2px;
    padding: 2px 7px 2px 10px;
    font-size: 17px;
  }
`;

OrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderCard;
