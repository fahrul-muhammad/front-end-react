// import { ACTION_STRING } from "../actions/actionString";
import { ACTION_STRING } from "../actions/actionsString";
import { ActionType } from "redux-promise-middleware";

const initialState = {
  userData: {
    data: {},
    token: "",
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const authReducer = (prevState = initialState, action) => {
  console.log(action);
  const { authLogin, saveData /* , pending, fulfilled, rejected */ } = ACTION_STRING;
  const { Pending, Fulfilled, Rejected } = ActionType;
  // membuat logic berdasarkan action
  switch (action.type) {
    // case authLogin + pending:
    case authLogin.concat("_", Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    // case authLogin + fulfilled:
    case authLogin.concat("_", Fulfilled):
      const token = action.payload;
      const userData = {
        ...prevState.userData.data,
        token: token,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    // case authLogin + rejected:
    case authLogin.concat("_", Rejected):
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    default:
      return prevState;
  }
};

export default authReducer;
