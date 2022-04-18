import { GET_TRACKING, GET_DASHBOARD, SET_ERROR, SET_LOADING } from "../types";
import store from "../store";
import {
  getTrackingsAPI,
  getDashboardAPI,
  downloadIcalFileAPI,
} from "../apis/trackings";

const { dispatch } = store;

export async function getTrackingsData(filter) {
  const token = store.getState().user?.user?.token;
  if (!token) return;
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  try {
    const data = await getTrackingsAPI(filter, token);
    const res = await data.json();

    if (res.message === "Success") {
      dispatch({
        type: GET_TRACKING,
        payload: { payload: res.payload, total: res.total },
      });
      return res;
    } else {
      dispatch({
        type: SET_ERROR,
        payload: res.message,
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

export async function getDashboardData() {
  const token = store.getState().user?.user?.token;
  if (!token) return;
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  try {
    const data = await getDashboardAPI(token);
    const res = await data.json();

    if (res.message === "Success") {
      dispatch({
        type: GET_DASHBOARD,
        payload: { payload: res.payload },
      });
      return res;
    } else {
      dispatch({
        type: SET_ERROR,
        payload: res.message,
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

export async function downloadIcalFile(file) {
  const token = store.getState().user?.user?.token;
  if (!token) return;
  try {
    const res = await downloadIcalFileAPI(file, token);
    return await res.blob();
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
    return err;
  }
}
