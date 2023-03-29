import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import statusColors from '../Utils/statusColors';
import mountDate from '../Utils/mountDate';

function OrderCard(props) {
  const history = useHistory();
  const { sale, user } = props;
  const { id, totalPrice, saleDate, status } = sale;
  const { pathname } = useLocation();

  const orderIdMaxLength = 4;
  return (
    <OrderCardContainer
      className="card"
      onClick={ () => history.push(`/${user.role}/orders/${id}`) }
    >
      <OrderId data-testid={ `${user.role}_orders__element-order-id-${id}` }>
        <div>Pedido</div>
        <div>{id.toString().padStart(orderIdMaxLength, '0')}</div>
      </OrderId>
      <div>
        <div>
          <OrderStatus
            data-testid={ `${user.role}_orders__element-delivery-status-${id}` }
            backgroundColor={ statusColors[status] }
          >
            <div>{status}</div>
          </OrderStatus>
          <OrderDatePrice>
            <div data-testid={ `${user.role}_orders__element-order-date-${id}` }>
              {mountDate(saleDate)}
            </div>
            <div data-testid={ `${user.role}_orders__element-card-price-${id}` }>
              {`R$ ${totalPrice.toString().replace('.', ',')}`}
            </div>
          </OrderDatePrice>
        </div>
        { pathname.includes('seller') && (
          <div
            data-testid={ `seller_orders__element-card-address-${id}` }
            className="adress"
          >
            {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
          </div>
        )}
      </div>
    </OrderCardContainer>
  );
}

const OrderCardContainer = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  margin: 20px;
  border: 1px solid #CBD4D2;
  border-radius: 5px;
  & > div:nth-child(2) {
    & >:nth-child(1){
      display: flex;
      flex-direction: row;
    }
    & >:nth-child(2){
      font-size: 15px;
      padding: 5px;
      text-align: left;
    }
  }
  .adress {
    display: flex;
    justify-content: flex-end;
    width: 95%;
  }
`;

const OrderId = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 150px;
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
  color: black;
  & > div {
    font-size: 25px;
    font-weight: 500;
    padding: 30px 0 30px 0;
  }
`;

const OrderDatePrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 5px;
  padding: 10px 0;
  & > div {
    margin: 2px;
    padding: 2px 7px 2px 10px;
    font-size: 18px;
    font-weight: 600;
  }
`;

OrderCard.propTypes = {
  user: PropTypes.shape({ role: PropTypes.string.isRequired }).isRequired,
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
