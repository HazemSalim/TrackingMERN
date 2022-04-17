import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERROR,
  SET_LOADING,
} from "../types";
import store from "../store";
import { login, logout, register } from "../apis/user.js";

const { dispatch } = store;

export async function registerUser(user) {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  try {
    const data = await register(user);

    if (data.token) {
      dispatch({
        type: REGISTER_USER,
        payload: { payload: data },
      });
      return data;
    } else {
      dispatch({
        type: SET_ERROR,
        payload: data.message,
      });
    }
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
    return err;
  }
}

export async function loginUser(user) {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  try {
    const data = await login(user);
  
    if (data.token) {
      dispatch({
        type: LOGIN_USER,
        payload: { payload: data },
      });
      return data;
    } else {
      dispatch({
        type: SET_ERROR,
        payload: data.message,
      });
    }
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
    return err;
  }
}

export function logoutUser() {
  logout();

  dispatch({
    type: LOGOUT_USER,
    payload: true,
  });
}
