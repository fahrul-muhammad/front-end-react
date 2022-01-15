import axios from "axios";

const URL = "http://localhost:8000/auth";
export const login = (body) => {
  return axios.post(URL, body);
};
