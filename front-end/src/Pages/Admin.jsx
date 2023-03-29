import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import NavBar from '../Components/NavBar';
import AdminForm from '../Components/AdminForm';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';
import MyContext from '../Context/MyContext';

function Admin() {
  const { theme, setTheme } = useContext(MyContext);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') setTheme('dark');
    if (!localTheme) localStorage.setItem('theme', 'light');
  }, []);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <NavBar />
      <AdminForm />
    </ThemeProvider>
  );
}

export default Admin;
