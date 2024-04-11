import Axios from "axios";

const axios = Axios.create();
const baseURL = "http://localhost:5001";

axios.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");

    config.headers["Authorization"] = "Bearer " + authToken;
    return config;
  },
  (error) => Promise.reject(error)
);

export const auth = async () => {
  const res = await axios.get(`${baseURL}/api/auth`);
  return res.data;
};

export const signup = async (data) => {
  const res = await axios.post(`${baseURL}/api/signup`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${baseURL}/api/login`, data);
  return res.data;
};

export const getAllUsers = async ({ search, size }) => {
  const res = await axios.get(
    `${baseURL}/api/user?search=${search || ""}&size=${size || 20}`
  );
  return res.data;
};

export const setAvatar = async ({ imgUrl }) => {
  const res = await axios.put(`${baseURL}/api/avatar`, { imgUrl });
  return res.data;
};

export const deleteUser = async () => {
  const res = await axios.delete(`${baseURL}/api/delete`);
  return res.data;
};

export const sendMessage = async (data) => {
  const res = await axios.post(`${baseURL}/api/message`, data);
  return res.data;
};

export const getMessage = async ({ user, size }) => {
  const res = await axios.get(`${baseURL}/api/message/${user}?size=${size || 20}`);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${baseURL}/api/user/${id}`);
  return res.data;
};
