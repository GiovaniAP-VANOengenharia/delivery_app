import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import MyContext from '../Context/MyContext';
import { requestAllSales } from '../services/requests';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';

function CustomerOrder() {
  const [sales, setSales] = useState();
  const [userData, setUser] = useState({});
  const { theme, setTheme } = useContext(MyContext);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') setTheme('dark');
    if (!localTheme) localStorage.setItem('theme', 'light');
  }, []);

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
  }, [sales]);

  const orderList = sales && sales.map(({ result }, index) => (
    <OrderCard sale={ result } user={ userData } key={ index } />
  ));

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <NavBar />
      <OrdersContainer>
        { sales && orderList}
      </OrdersContainer>
    </ThemeProvider>
  );
}

const OrdersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 95%;
`;

export default CustomerOrder;
