import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { requestDeleteUser } from '../services/requests';

function AdmTable(props) {
  const { users, setUsers } = props;
  const tableHeaders = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  const removeUser = async (id) => {
    await requestDeleteUser(`/delete/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <AdmContainer>
      <h1>Lista de Usuários</h1>
      <table>
        <AdmTableContainer>
          <thead>
            <tr>
              { tableHeaders.map((header) => (
                <th key={ header }>{ header }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { users.map((user, index) => {
              const { id, name, email, role } = user;

              return (
                <tr key={ name }>
                  <td
                    data-testid={
                      `adm_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1 }
                  </td>

                  <td
                    data-testid={
                      `adm_order_details__element-order-table-name-${index}`
                    }
                  >
                    { name }
                  </td>

                  <td
                    data-testid={
                      `adm_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { email }
                  </td>

                  <td
                    data-testid={
                      `adm_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { role }
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                      onClick={ () => removeUser(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </AdmTableContainer>
      </table>
    </AdmContainer>
  );
}

const AdmContainer = styled.div`
  width: 100%;
  background-color: #FBFFFE;
  & > p {
    font-size: 25px;
    text-align: left;
    width: 90%;
  }
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    margin-left: 67%;
    margin-bottom: 20px;
    background-color: #036B52;
    border: 1px solid #036B52;
    color: white;
    padding: 10px;
    height: 30px;
    border-radius: 8px;
  }
`;

const AdmTableContainer = styled.table`
  width: 1190px;
  height: 40px;
  border-spacing: 0 10px;
  border: 1px solid #CBD4D2;
  padding: 10px 20px;

  & > tbody > tr > td {
    height: 40px;
  }
  & > tbody > tr > td:nth-child(1) {
    width: 4%;
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    border-radius: 8px 0 0 8px;
    background-color: #2FC18C;
    margin: 0;
    padding: 5px 20px;
  }
  & > tbody > tr > td:nth-child(2) {
    width: 50%;
    font-size: 20px;
    background-color: #EAF1EF;
    text-align: left;
    margin: 0;
    padding: 7.5px 15px;
  }
  & > tbody > tr > td:nth-child(3) {
    width: 10%;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #036B52;
    color: white;   
  }
  & > tbody > tr > td:nth-child(4) {
    width: 10%;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #421981;
    color: white;
  }
  & > tbody > tr > td:nth-child(5) {
    background-color: #056CF9;
    border-radius: 0 5px 5px 0;
    & > button {
    width: 100%;
    text-align: center;
    font-size: 22px;
    margin: 0;
    padding: 5px 10px;
    border: none;
    background-color: #056CF9;
    color: white;
    }
  }
  & > tbody > tr > td:nth-child(6) {
    width: 15%;
    height: 100%;
    border: 1px solid #2FC18C;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 5px;
    background-color: #2FC18C;
    border-radius: 0 8px 8px 0;
    color: white;
    border: none;
  }
  & > tbody > tr > td:nth-child(6) > button {
    width: 20%;
    height: 100%;
    border: 1px solid #2FC18C;
    text-align: center;
    font-size: 20px;
    margin: 0;
    padding: 5px;
    background-color: #2FC18C;
    color: white;
    border: none;
  }
`;

AdmTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })).isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default AdmTable;
