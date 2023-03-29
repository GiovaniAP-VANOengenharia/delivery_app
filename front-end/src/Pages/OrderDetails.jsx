/* eslint-disable max-lines */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import OrderTable from '../Components/OrderTable';
import {
  requestSaleById,
  requestSellerById,
  requestUpdateSale,
  setToken,
} from '../services/requests';
import mountDate from '../Utils/mountDate';
import { fixDecimals } from '../Utils';
import NavBar from '../Components/NavBar';
import statusColors from '../Utils/statusColors';
import MyContext from '../Context/MyContext';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';

function OrderDetails() {
  const [sale, setSale] = useState();
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [sellerName, setSellerName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [disablePrep, setDisablePrep] = useState(false);
  const [disableDisp, setDisableDisp] = useState(true);
  const { theme, setTheme } = useContext(MyContext);
  const { id } = useParams();
  const orderIdMaxLength = 4;

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') setTheme('dark');
    if (!localTheme) localStorage.setItem('theme', 'light');
  }, []);

  useEffect(() => {
    const getSales = async () => {
      const userData = localStorage.getItem('user');
      const loginFields = JSON.parse(userData);
      setRole(loginFields.role);
      setToken(loginFields.token);
      const data = await requestSaleById(`/order/${id}`);
      setSale(data);
      if (loginFields.role === 'customer') {
        const seller = await requestSellerById(`/sellers/${data.result.sellerId}`);
        setSellerName(seller.result.name);
      }
    };
    getSales();
  }, []);
  useEffect(() => {
    if (sale && sale.result.status === 'Em Trânsito') {
      setIsDisabled(false);
      setDisableDisp(true);
      setDisablePrep(true);
    }
    if (sale && sale.result.status === 'Preparando') {
      setIsDisabled(true);
      setDisablePrep(true);
      setDisableDisp(false);
    }
    if (sale && sale.result.status === 'Entregue') {
      setIsDisabled(true);
      setDisablePrep(true);
      setDisableDisp(true);
    }
    if (sale) setStatus(sale.result.status);
  }, [sale]);
  const updateStatus = async ({ target }) => {
    const { name } = target;
    const updateStatusSale = await requestUpdateSale(`/order/update/${id}`, {
      status: name,
      id,
    });
    setSale(updateStatusSale);
  };
  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <OrderPage>
        <NavBar />
        {sale && (
          <OrderContainer>
            <h1>Detalhes do Pedido</h1>
            <OrderHeader className="order-header">
              <OrderNumber
                data-test-id={
                  `${role}_order_details__element-order-details-label-order-id`
                }
              >
                <p>PEDIDO</p>
                {id.toString().padStart(orderIdMaxLength, '0')}
              </OrderNumber>
              { role === 'customer' && (
                <Seller
                  data-testid={
                    `customer_order_details__element-order-details-label-seller-${'name'}`
                  }
                >
                  <p>P. Vend:</p>
                  {sellerName}
                </Seller>
              )}
              <DateContainer
                data-testid={
                  `${role}_order_details__element-order-details-label-order-${'date'}`
                }
              >
                { mountDate(new Date(sale.result.saleDate)) }
              </DateContainer>
              <DeliveryStatus
                data-testid={
                  `${role}_order_details__element-order-details-label-delivery-status${id}`
                }
                style={ { backgroundColor: statusColors[status] } }
              >
                { status }
              </DeliveryStatus>
              { role === 'customer' && (
                <MarkAsButton
                  type="button"
                  disabled={ isDisabled }
                  name="Entregue"
                  data-testid="customer_order_details__button-delivery-check"
                  onClick={ updateStatus }
                >
                  MARCAR COMO ENTREGUE
                </MarkAsButton>
              )}
              { role === 'seller' && (
                <SellerButtons>
                  <button
                    type="button"
                    name="Preparando"
                    disabled={ disablePrep }
                    data-testid="seller_order_details__button-preparing-check"
                    onClick={ updateStatus }
                  >
                    Preparar Pedido
                  </button>

                  <button
                    type="button"
                    name="Em Trânsito"
                    disabled={ disableDisp }
                    data-testid="seller_order_details__button-dispatch-check"
                    onClick={ updateStatus }
                  >
                    Saiu para Entrega
                  </button>
                </SellerButtons>
              )}
            </OrderHeader>
            <OrderTable role={ role } sale={ sale } />
            <div
              data-testid={ `${role}_order_details__element-order-total-price` }
            >
              { `Total: R$ ${fixDecimals(sale.result.totalPrice)}`}
            </div>
          </OrderContainer>
        )}
      </OrderPage>
    </ThemeProvider>
  );
}

const OrderPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  & >:nth-child(4){
    position: fixed;
    top:800px;
    right: 350px;
    background-color: #036b52;
    color: white;
    font-size: 45px;
    padding: 10px 30px;
    border-radius: 5px;
    border: none;
  }`;
const OrderHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #B1C2BE;
  border-radius: 5px;
  height: 50px;
  padding: 0 10px;
  margin: 5px;
`;
const OrderNumber = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  font-size: 25px;
  font-weight: 500;
  margin: 0;
  & >:nth-child(1){
    margin: 0 5px 0 0;
  }`;
const Seller = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  align-items: center;
  font-size: 22px;
  width: 300px;
  & > p {
    margin: 0 10px 0 10px;
  }`;
const DateContainer = styled.p`
  width: 120px;
  text-align: center;
  margin: 2px;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 22px;
  font-weight: 500;
  `;
const DeliveryStatus = styled.p`
  width: 190px;
  padding: 0 10px;
  text-align: center;
  line-height: 180%;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 500;
  height: 90%;
  `;
const MarkAsButton = styled.button`
  width: 270px;
  font-size: 17px;
  text-align: center;
  padding: 10px 13px;
  border: none;
  color: white; border-radius: 5px; background-color: #036B52;
  :disabled {
    background-color: #036b5352;
      color: white
  }
  `;
const SellerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 600px;
  text-align: right;
  & > button {
    width: 250px; padding: 6px;
    border-radius: 5px;
    border: none; font-size: 22px; color: white;
    :nth-child(1){
      background-color: #2FC18C;
      margin-right: 10px;
      :disabled {
      background-color: #2fc18c7b;
      }
    }
    :nth-child(2){
      background-color: #036B52;
      :disabled {
        background-color: #036b5380;
      }
    }
  }`;

export default OrderDetails;
