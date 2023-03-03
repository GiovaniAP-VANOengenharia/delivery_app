import React from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderDetailLine from '../Components/OrderDetailLine';

function OrderDetail() {
  // const { id } = useParams();
  return (
    <div>
      <NavBar />
      <OrderContainer>
        <h1>Detalhe do pedido</h1>
        <OrderHeader>
          <p>PEDIDO 0003;</p>
          <p>P.Vend: Fulana Pereira</p>
          <p>07/04/2021</p>
          <p>ENTREGUE</p>
          <button type="button">MARCAR COMO ENTREGUE</button>
        </OrderHeader>
        <OrderDetailLine />
        <OrderDetailLine />
        <OrderDetailLine />
        <OrderDetailLine />
        <OrderDetailLine />
        <OrderDetailLine />
        <OrderDetailLine />
      </OrderContainer>
    </div>
  );
}

const OrderContainer = styled.div`
  margin: 20px 50px;
`;

const OrderHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default OrderDetail;
