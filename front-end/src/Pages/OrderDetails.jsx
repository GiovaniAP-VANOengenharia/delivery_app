import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderTable from '../Components/OrderTable';
import { requestSaleById, setToken } from '../services/requests';
import mountDate from '../Utils/mountDate';
import { fixDecimals } from '../Utils';
import NavBar from '../Components/NavBar';

function SellerOrdersDetails() {
  const [sale, setSale] = useState();
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
        <div>
          <div>
            Detalhes do Pedido
          </div>
          <div>
            <span> PEDIDO </span>
            <span
              data-test-id={
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
                `${role}_order_details__element-order-details-label-delivery-status`
              }
            >
              { sale.result.status }
            </span>
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

          </div>
          <OrderTable sale={ sale } />
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

export default SellerOrdersDetails;
