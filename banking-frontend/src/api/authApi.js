import axios from 'axios';

const API_URL_auth = 'http://localhost:8080/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL_auth}/login`, { email, password });
  console.log(response.data);
  console.log(response.data.access_token);
  return response.data;
};

export const register = async (email, password) => {
  console.log("inside register api", email);
  const response = await axios.post(`${API_URL_auth}/signup`, { email, password });
  return response.data;
};

// export const logout = async () => {
//   return await axios.post(`${API_URL_auth}/logout`);
// };


const API_URL_account = 'http://localhost:8081/accounts';

export const createAccount = async (userId, accountNumber) => {
  const response = await axios.post(`${API_URL_account}`, { userId, accountNumber });
  return response.data;
};

export const getAccountsByUserId = async (userId) => {
  const response = await axios.post(`${API_URL_account}/userId`, { userId });
  return response.data;
};

export const deleteAccountsByAccountNumber = async (accountNumber) => {
  const response = await axios.post(`${API_URL_account}/delete`, { accountNumber });
  return response.data;
};

export const updateAccountStatus = async (accountNumber, status) => {
  console.log(accountNumber, status)
  const response = await axios.post(`${API_URL_account}/status`, { accountNumber, status });
  return response.data;
};