import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <div>
          <div>
            Detalhes do Pedido
          </div>
          <div>
            <span> PEDIDO </span>
            <span
              data-testid={
                `${role}_order_details__element-order-details-label-order-id`
              }
            >
              {id.toString().padStart(orderIdMaxLength, '0')}
            </span>
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
            <span
              data-testid={
                `${role}_order_details__element-order-details-label-order-${'date'}`
              }
            >
              { mountDate(new Date(sale.result.saleDate)) }
            </span>
            <span
              data-testid={
                `${role}_order_details__element-order-details-label-delivery-status${id}`
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

          </div>
          <OrderTable role={ role } sale={ sale } />
          <div
            data-testid={ `${role}_order_details__element-order-total-price` }
          >
            { fixDecimals(sale.result.totalPrice) }
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
