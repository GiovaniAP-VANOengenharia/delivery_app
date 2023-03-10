import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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

function OrderDetails() {
  const [sale, setSale] = useState();
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [sellerName, setSellerName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [disablePrep, setDisablePrep] = useState(false);
  const [disableDisp, setDisableDisp] = useState(true);
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
      if (loginFields.role === 'customer') {
        const seller = await requestSellerById(`/sellers/${data.result.sellerId}`);
        setSellerName(seller.result.name);
      }
    };
    getSales();
  }, []);

  useEffect(() => {
    const state = () => {
      if (sale && sale.result.status === 'Em Trânsito') {
        setIsDisabled(false);
        setDisableDisp(true);
        setDisablePrep(true);
      }
      if (sale && sale.result.status === 'Preparando') {
        setDisablePrep(true);
        setDisableDisp(false);
      }
      if (sale && sale.result.status === 'Entregue') {
        setIsDisabled(true);
        setDisablePrep(true);
        setDisableDisp(true);
      }
      if (sale) setStatus(sale.result.status);
    };
    state();
  }, [sale]);

  const updateStatus = async ({ target }) => {
    const { name } = target;
    const updateStatusSale = await requestUpdateSale(`/order/update/${id}`, {
      status: name,
      id,
    });
    console.log(updateStatusSale);
    setSale(updateStatusSale);
  };

  return (
    <div>
      <NavBar />
      {sale && (
        <OrderContainer>
          <div>
            <div>
              Detalhes do Pedido
            </div>
            <div>
              <OrderHeader>
                <span> PEDIDO </span>
                <span
                  data-testid={
                    `${role}_order_details__element-order-details-label-order-id`
                  }
                >
                  {id.toString().padStart(orderIdMaxLength, '0')}
                </span>
                { role === 'customer' && (
                  <OrderSeller
                    data-testid={
                      `customer_order_details__element-order-details-label-seller-${'name'}`
                    }
                  >
                    <p>{ `Pessoa Vendedora: ${sellerName}` }</p>
                  </OrderSeller>
                )}
                <span
                  data-testid={
                    `${role}_order_details__element-order-details-label-order-${'date'}`
                  }
                >
                  { mountDate(new Date(sale.result.saleDate)) }
                </span>
                <span
                  data-testid={
                    `${role}_order_details__
                  element-order-details-label-delivery-status${id}`
                  }
                >
                  { status }
                </span>
                { role === 'customer' && (
                  <button
                    type="button"
                    disabled={ isDisabled }
                    name="Entregue"
                    data-testid="customer_order_details__button-delivery-check"
                    onClick={ updateStatus }
                  >
                    MARCAR COMO ENTREGUE
                  </button>
                )}
                { role === 'seller' && (
                  <div>
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
                  </div>
                )}
              </OrderHeader>
            </div>
            <OrderTable role={ role } sale={ sale } />
            <Detailsfooter
              data-testid={ `${role}_order_details__element-order-total-price` }
            >
              { `Total: R$ ${fixDecimals(sale.result.totalPrice)}` }
            </Detailsfooter>
          </div>
        </OrderContainer>
      )}
    </div>
  );
}

const Detailsfooter = styled.div`
  position: fixed;
  top:550px;
  left: 900px;
  background-color: #036b52;
  color: white;
  font-size: 25px;
  padding: 8px 25px;
  border-radius: 5px;
`;

const OrderContainer = styled.div`
  margin: 20px 50px;
  border: 1px solid black;
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

const OrderSeller = styled.div`
  display: flex;
  flex-direction: row;
`;

export default OrderDetails;
