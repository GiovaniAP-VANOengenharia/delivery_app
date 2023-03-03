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
  align-items: center;
  border: 1px solid #B1C2BE;
  background-color: #EAF1EF;
  height: 40px;
  padding: 0 10px 0 10px;
  & > p:nth-child(1) {
    font-size: 25px;
    font-weight: 500;
    margin: 0;
  }
  & > p:nth-child(2) {
    font-size: 20px;
    margin: 0;
  }
`;

export default OrderDetail;
