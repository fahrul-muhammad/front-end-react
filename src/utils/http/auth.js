import axios from "axios";

const URL = "http://localhost:8000/auth";
export const login = (body) => {
  return axios.post(URL, body);
};

export const forgotPassword = (body) => {
  const URL = `${process.env.REACT_APP_HOST}/auth/forgotpassword`;
  return axios.post(URL, body);
};

export const setNewPassowrd = (body) => {
  const URL = `${process.env.REACT_APP_HOST}/auth/setnewpassword`;
  return axios.patch(URL, body);
};
