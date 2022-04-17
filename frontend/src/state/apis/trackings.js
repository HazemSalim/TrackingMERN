import { API_URL } from "../../utils/constants";

export function getTrackingsAPI(filter, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let filters = Object.keys(filter).map((item) => {
    return `${item}=${filter[item]}`;
  });

  return fetch(
    `${API_URL}/tracking/get-trackings?${filters.join("&")}`,
    config
  );
}

export function getDashboardAPI(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${API_URL}/tracking/get-summary`, config);
}

export function downloadIcalFileAPI(id, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${API_URL}/ical/${id}`, config);
}
