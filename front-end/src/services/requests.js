import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestSellers = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestSale = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestAdm = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
}

// export const createUserAdm = async ({ name, email, token, role }) => {
//   const payLoad = { name, email, token, role };
//   try {
//     const response = await fetch(
//       urlCreateAdm,
//       {
//         ...HEADERS_POST,
//         body: JSON.stringify(payLoad),
//       }
//     );
//   } catch (error) {
    
//   }
// }

export default api;
