import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/MyProvider';
import Login from './Pages/Login';
import Products from './Pages/Products';

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
        <Route exact path="/products">
          <Products />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
