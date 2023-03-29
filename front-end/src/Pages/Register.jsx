import React, { useContext, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import RegisterForm from '../Components/RegisterForm';
import MyContext from '../Context/MyContext';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';

function Register() {
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
      <RegisterContainer>
        <h1>Cadastro</h1>
        <RegisterForm />
      </RegisterContainer>
    </ThemeProvider>
  );
}

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Register;
