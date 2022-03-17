import axios from "axios";

export const getVehicleByCategory = (url /* category, page, limit, order, sorting */) => {
  const URL = `${process.env.REACT_APP_HOST}/vehicle/${url}`;
  return axios.get(URL);
};
