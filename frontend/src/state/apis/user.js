import { API_URL } from "../../utils/constants";
import axios from "axios";

export async function register(user) {
  const response = await axios.post(`${API_URL}/user`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export async function login(userData) {
  const response = await axios.post(API_URL + "/user/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export const logout = () => {
  localStorage.removeItem("user");
};
