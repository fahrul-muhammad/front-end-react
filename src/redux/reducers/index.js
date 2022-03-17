import { combineReducers } from "redux";
// menggabungkan semua reducer menjadi 1
import authReducer from "./test";
import Payment from "./payment";

const reducers = combineReducers({
  auth: authReducer,
  payment: Payment,
});

export default reducers;
