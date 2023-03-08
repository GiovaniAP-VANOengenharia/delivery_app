import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { requestAllSales } from '../services/requests';

function CustomerOrder() {
  const [sales, setSales] = useState();
  const [userData, setUser] = useState({});

  useEffect(() => {
    const getSales = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      const data = await requestAllSales('/order');
      const userId = JSON.parse(localStorage.getItem('id'));
      let userOrders = [];
      if (user.role === 'customer') {
        userOrders = data.filter((sale) => userId === sale.result.userId);
      }
      if (user.role === 'seller') {
        userOrders = data.filter((sale) => userId === sale.result.sellerId);
      }
      setSales(userOrders);
    };
    getSales();
  }, []);

  const orderList = sales && sales.map(({ result }, index) => (
    <OrderCard sale={ result } user={ userData } key={ index } />
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
