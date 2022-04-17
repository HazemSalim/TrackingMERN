import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERROR,
  SET_LOADING,
} from "../types";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

let initialState = {
  user: user ? user : null,
  loading: false,
  error: false,
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.payload,
        loading: false,
        error: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        loading: false,
        error: false,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload, user: null };
    default:
      return state;
  }
};

export default userReducer;
