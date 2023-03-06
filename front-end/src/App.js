import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/MyProvider';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Order from './Pages/Order';
import OrderDetail from './Pages/OrderDetail';
import Products from './Pages/Products';
import Register from './Pages/Register';
import FinishSale from './Pages/FinishSale';

function App() {
  return (
    <Provider>
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

        <Route exact path="/customer/order">
          <Order />
        </Route>

        <Route exact path="/customer/order/:id">
          <OrderDetail />
        </Route>

        <Route exact path="/customer/checkout">
          <Checkout />
        </Route>

        <Route exact path="/finished">
          <FinishSale />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

      </Switch>
    </Provider>
  );
}

export default App;
