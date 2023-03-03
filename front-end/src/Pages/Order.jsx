import React from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';

function Order() {
  const sales = [
    {
      order: '0001',
      orderId: 1,
      status: 'PENDENTE',
      date: '08/04/2023',
      price: 'R$23,80',
    },
    {
      order: '0002',
      orderId: 2,
      status: 'ENTREGUE',
      date: '09/04/2023',
      price: 'R$23,80',
    },
    {
      order: '0002',
      orderId: 4,
      status: 'PREPARANDO',
      date: '10/04/2023',
      price: 'R$23,80',
    },
    {
      order: '0002',
      orderId: 5,
      status: 'PREPARANDO',
      date: '11/04/2023',
      price: 'R$23,80',
    },
    {
      order: '0002',
      orderId: 6,
      status: 'PREPARANDO',
      date: '12/04/2023',
      price: 'R$23,80',
    },
  ];

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
