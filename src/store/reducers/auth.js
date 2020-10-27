import * as actionTypes from "../actions/actionTypes";
import { UpdateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return UpdateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return UpdateObject(state, {
    token: action.tokenId,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authFailed = (state, action) => {
  return UpdateObject(state, { error: action.error, loading: false });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    default:
      return state;
  }
};

export default authReducer