import React from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import AdminForm from '../Components/AdminForm';

function Admin() {
  return (
    <AdminContainer>
      <NavBar />
      <AdminForm />
    </AdminContainer>
  );
}

const AdminContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Admin;
