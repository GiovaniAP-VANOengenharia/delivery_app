import React from 'react';
import SellerOrdersTable from '../Components/SellerOrdersTable';

function SellerOrdersDetails() {
  return (
    <>
      Detalhes do Pedido
      <div>
        <span> Pedido </span>
        <span
          data-test-id="seller_order_details__element-order-details-label-order-id"
        >
          ! ID do Pedido !
        </span>
        <span
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          ! Status !
        </span>

        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          Preparar Pedido
        </button>

        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
        >
          Saiu para Entrega
        </button>
      </div>
      <SellerOrdersTable />
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        ! totalPrice !
      </div>
    </>
  );
}

export default SellerOrdersDetails;
