import React from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import salesMock from '../Utils/salesMock';

function Order() {
  const sales = salesMock;

  const orderList = sales.map((sale, index) => (
    <OrderCard sale={ sale } key={ index } />
  ));

  return (
    <div>
      <NavBar />
      <OrdersContainer>
        {orderList}
      </OrdersContainer>
    </div>
  );
}

const OrdersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  
`;

export default Order;
