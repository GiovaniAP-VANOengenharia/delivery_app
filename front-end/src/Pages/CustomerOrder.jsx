import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { requestAllSales } from '../services/requests';

function CustomerOrder() {
  const [sales, setSales] = useState();

  useEffect(() => {
    const getSales = async () => {
      const data = await requestAllSales('/order');
      setSales(data);
    };
    getSales();
  }, []);

  const orderList = sales && sales.map((sale, index) => (
    <OrderCard sale={ sale } key={ index } />
  ));

  return (
    <div>
      <NavBar />
      <OrdersContainer>
        { sales && orderList}
      </OrdersContainer>
    </div>
  );
}

const OrdersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  
`;

export default CustomerOrder;
