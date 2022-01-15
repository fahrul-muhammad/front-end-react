import { createStore, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
import logger from "redux-logger";
import rpm from "redux-promise-middleware";
import reducers from "./reducers";

const saveState = (state) => {
  try {
    console.log("Masuk save state");
    const stringifyState = JSON.stringify(state);
    localStorage.setItem("state", stringifyState);
  } catch (error) {
    alert("Theres error from redux store");
    console.log(error);
  }
};

const loadState = () => {
  try {
    const stateFromLocal = localStorage.getItem("state");
    console.log("MAsuk load state");
    if (stateFromLocal === null) {
      return undefined;
    } else {
      return JSON.parse(stateFromLocal);
    }
  } catch (error) {
    console.log(error);
  }
};

// const logger = createLogger();
const theState = loadState();
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(reducers, theState, enhancers);
// 2 parameter = reducer & enhancer (opt)
// enhancer = middleware

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
