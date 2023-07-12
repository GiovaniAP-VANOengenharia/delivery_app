import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import { lightTheme, darkTheme } from './theme';
import OrderDetails from './Pages/OrderDetails';
import GlobalStyle from './theme/GlobalStyle';
import MyContext from './Context/MyContext';

function App() {
  const { theme, setTheme } = useContext(MyContext);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') {
      setTheme('dark');
    }
    if (!localTheme) {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <Switch>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/customer/products">
          <Products />
        </Route>

        <Route exact path="/:user/orders">
          <Orders />
        </Route>

        <Route exact path="/:user/orders/:id">
          <OrderDetails />
        </Route>

        <Route exact path="/customer/checkout">
          <Checkout />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/admin/manage">
          <Admin />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
