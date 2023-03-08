import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderDetailLine from '../Components/OrderDetailLine';
import { requestSaleById, requestSellers, setToken } from '../services/requests';
import mountDate from '../Utils/mountDate';
import { fixDecimals } from '../Utils';

function OrderDetails() {
  const [sale, setSale] = useState();
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState('');
  const [sellerName, setSellerName] = useState('');
  const { id } = useParams();

  const orderIdMaxLength = 4;

  useEffect(() => {
    const getSales = async () => {
      const userData = localStorage.getItem('user');
      const loginFields = JSON.parse(userData);
      setRole(loginFields.role);
      setToken(loginFields.token);
      const data = await requestSaleById(`/order/${id}`);
      setSale(data);
      setCart(data.result.cart);
      if (role === 'customer') {
        const sellers = await requestSellers('sellers');
        setSellerName(sellers
          .find((curr) => curr.id === Number(saleDetail.result.sellerId)).name);
      }
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
              data-test-id={
                `${role}_order_details__element-order-details-label-order-id`
              }
            >
              <p>PEDIDO</p>
              {id.toString().padStart(orderIdMaxLength, '0')}
            </div>
            { role === 'customer' && (
              <div
                data-testid={
                  `customer_order_details__element-order-details-label-seller-${'name'}`
                }
              >
                <p>Pessoa Vendedora:</p>
                {sellerName}
              </div>
            )}
            <p
              data-testid={
                `${role}_order_details__element-order-details-label-order-${'date'}`
              }
            >
              {mountDate(new Date(sale.result.saleDate))}
            </p>
            <p
              data-testid={
                `${role}_order_details__element-order-details-label-delivery-status`
              }
            >
              {sale.result.status}
            </p>
            { role === 'customer' && (
              <button
                type="button"
                disabled="true"
                data-testid="customer_order_details__button-delivery-check"
              >
                MARCAR COMO ENTREGUE
              </button>
            )}
            { role === 'seller' && (
              <div>
                <button
                  type="button"
                  data-testid={ `${role}_order_details__button-preparing-check` }
                >
                  Preparar Pedido
                </button>

                <button
                  type="button"
                  data-testid={ `${role}_order_details__button-dispatch-check` }
                >
                  Saiu para Entrega
                </button>
              </div>
            )}
          </OrderHeader>
          { cart.map((product, index) => (
            <OrderDetailLine
              productIndex={ index }
              productData={ product }
              role={ role }
              key={ product.id }
            />
          ))}
          <h1
            data-testid={ `${role}_order_details__element-order-total-price` }
          >
            { fixDecimals(sale.result.totalPrice) }
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

export default OrderDetails;
