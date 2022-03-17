export const PaymentData = (data) => {
  return {
    type: "SET_PAYMENT_FULFILLED",
    payload: data,
  };
};

export const DelPaymentData = (data) => {
  return {
    type: "DEL_PAYMENT_FULFILLED",
  };
};
