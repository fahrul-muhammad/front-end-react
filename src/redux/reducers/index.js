import { combineReducers } from "redux";
// menggabungkan semua reducer menjadi 1
import authReducer from "./test";

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
