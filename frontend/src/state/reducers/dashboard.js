import { GET_DASHBOARD, SET_ERROR, SET_LOADING } from "../types";

let initialState = {
  dashboard: {},
  loading: true,
  error: false,
};

const dashboardReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload.payload,
        loading: false,
        error: false,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;
