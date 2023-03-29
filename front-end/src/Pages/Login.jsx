import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import LoginForm from '../Components/LoginForm';
import MyContext from '../Context/MyContext';
import delivery from '../images/Delivery.png';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';

function Login() {
  const { theme, setTheme } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') {
      setTheme('dark');
    }
    if (!localTheme) {
      localStorage.setItem('theme', 'light');
    }
    const user = localStorage.getItem('user');
    if (user) {
      history.push('/customer/products');
    }
  }, []);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <LoginContainer>
        <LogoContainer>
          <img alt="logoApp" src={ delivery } />
          <h1>IBeer</h1>
        </LogoContainer>
        <LoginForm />
      </LoginContainer>
    </ThemeProvider>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
      width: 400px;
      margin: 0;
      padding: 0;
    }
  & > h1 {
      margin: 0;
    }
`;

export default Login;
