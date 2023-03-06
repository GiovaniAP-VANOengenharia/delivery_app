import React, { useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { requestSales } from '../services/requests';

function Order() {
  const [sales, setSales] = useState();

  useEffect(() => {
    const getSales = async () => {
      const data = await requestSales('/order');
      setSales(data);
    };
    getSales();
  }, []);

  const orderList = sales.map((sale, index) => (
    <OrderCard sale={ sale } key={ index } />
  ));

  return (
    <div>
      <NavBar />
      <OrdersContainer>
        {orderList}
      </OrdersContainer>
    </div>
  );
}

const OrdersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  
`;

export default Order;
