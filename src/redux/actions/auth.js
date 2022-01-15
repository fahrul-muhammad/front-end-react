import { ACTION_STRING } from "../actions/actionsString";
// import { login } from "../../utils/http/auth";

export const loginAction = (token) => {
  return {
    type: ACTION_STRING.authLogin,
    payload: token,
  };
};

export const saveAction = (data) => {
  return {
    type: ACTION_STRING.saveData,
    payload: data,
  };
};
