import { GET_TRACKING, SET_ERROR, SET_LOADING } from "../types";

let initialState = {
  trackings: [],
  total: 0,
  loading: true,
  error: false,
};

const trackingsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_TRACKING:
      return {
        ...state,
        trackings: action.payload.payload,
        total: action.payload.total,
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

export default trackingsReducer;
