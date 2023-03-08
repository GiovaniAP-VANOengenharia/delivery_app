import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderDetailLine from '../Components/OrderDetailLine';
import MyContext from '../Context/MyContext';
import { requestAllSales, requestSellers, setToken } from '../services/requests';
import mountDate from '../Utils/mountDate';

function OrderDetail() {
  const { cart, setCart } = useContext(MyContext);

  const [sale, setSale] = useState();
  const [sellerName, setSellerName] = useState();

  const { id } = useParams();

  const orderIdMaxLength = 4;

  useEffect(() => {
    const products = localStorage.getItem('products');
    const newCart = JSON.parse(products);
    setCart(newCart);
  }, []);

  useEffect(() => {
    const getSales = async () => {
      const userData = localStorage.getItem('user');
      const loginFields = JSON.parse(userData);
      setToken(loginFields.token);
      const data = await requestAllSales('/order');
      const saleDetail = data.filter(({ result }) => result.id === Number(id))[0];
      const sellers = await requestSellers('sellers');
      setSellerName(sellers
        .filter((curr) => curr.id === Number(saleDetail.result.sellerId))[0].name);
      setSale(saleDetail);
    };
    getSales();
  }, []);

  return (
    <div>
      <NavBar />
      {sale && (
        <OrderContainer>
          <h1>Detalhe do pedido</h1>
          <OrderHeader>
            <div
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              <p>PEDIDO</p>
              {id.toString().padStart(orderIdMaxLength, '0')}
            </div>
            <div
              data-testid={
                `customer_order_details__element-order-details-label-seller-${'name'}`
              }
            >
              <p>Pessoa Vendedora:</p>
              {sellerName}
            </div>
            <p
              data-testid={
                `customer_order_details__element-order-details-label-order-${'date'}`
              }
            >
              {mountDate(new Date(sale.result.saleDate))}
            </p>
            <p
              data-testid={
                `customer_order_details__element-order-details-label-delivery-status${id}`
              }
            >
              {sale.result.status}
            </p>
            <button
              type="button"
              disabled="true"
              data-testid="customer_order_details__button-delivery-check"
            >
              MARCAR COMO ENTREGUE
            </button>
          </OrderHeader>
          { cart.map((product, index) => (
            <OrderDetailLine
              productIndex={ index }
              productData={ product }
              key={ product.id }
            />
          ))}
          <h1
            data-testid="customer_order_details__element-order-total-price"
          >
            {sale.result.totalPrice.toString().replace('.', ',')}
          </h1>
        </OrderContainer>
      )}
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
  & > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0;
    font-size: 25px;
    font-weight: 500;
    margin: 0;
    & >:nth-child(1){
      margin: 0 5px 0 0;
    }
  }
  & > p:nth-child(2) {
    font-size: 20px;
    margin: 0;
  }
`;

export default OrderDetail;
