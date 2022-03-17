import axios from "axios";

export const Payment = (body, token) => {
  console.log("BODY AXIOS", body);
  const URL = `${process.env.REACT_APP_HOST}/history `;
  return axios.post(URL, body, { headers: { token: token } });
};
