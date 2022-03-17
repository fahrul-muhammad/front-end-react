const initialState = {
  data: {},
};

const Payment = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PAYMENT_FULFILLED":
      return {
        ...state,
        data: action.payload,
      };

    case "DEL_PAYMENT_FULFILLED":
      return {
        data: {},
      };

    default:
      return state;
  }
};

export default Payment;
