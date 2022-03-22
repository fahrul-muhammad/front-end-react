import axios from "axios";

export const getVehicleByCategory = (url /* category, page, limit, order, sorting */) => {
  const URL = `${process.env.REACT_APP_HOST}/vehicle/${url}`;
  return axios.get(URL);
};

export const deletVehicle = (id, body, token) => {
  const URL = `${process.env.REACT_APP_HOST}/vehicle/${id}`;
  return axios.patch(URL, body, { headers: { token: token } });
};
