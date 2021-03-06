import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const burgerOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.BURGER_ORDER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const burgerOrderFailed = (error) => {
  return {
    type: actionTypes.BURGER_ORDER_FAILED,
    error: error,
  };
};

export const startPurchasingBurger = () => {
  return {
    type: actionTypes.START_PURCHASING_BURGER,
  };
};

export const startOrder = (orderData, token) => {
  return (dispatch) => {
    dispatch(startPurchasingBurger());
    axios
      .post("orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(burgerOrderSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(burgerOrderFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
