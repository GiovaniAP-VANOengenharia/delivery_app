import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderDetailLine from '../Components/OrderDetailLine';
import MyContext from '../Context/MyContext';

function OrderDetail() {
  const { cart, setCart } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    const products = localStorage.getItem('products');
    const newCart = JSON.parse(products);
    setCart(newCart);
  }, []);

  return (
    <div>
      <NavBar />
      <OrderContainer>
        <h1>Detalhe do pedido</h1>
        <OrderHeader>
          <p>{ `PEDIDO ${id}` }</p>
          <p>P.Vend: Fulana Pereira</p>
          <p>07/04/2021</p>
          <p>ENTREGUE</p>
          <button type="button">MARCAR COMO ENTREGUE</button>
        </OrderHeader>
        { cart.map((product, index) => (
          <OrderDetailLine
            productIndex={ index }
            productData={ product }
            key={ product.id }
          />
        ))}
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
