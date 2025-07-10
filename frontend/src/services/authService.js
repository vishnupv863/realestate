import axios from "axios";
import { BASE_URL } from "../config";

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

export const login = async (credentials) => {
  return await axios.post(`${BASE_URL}/auth/login`, credentials, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
};

export const register = async (userData) => {
  return await axios.post(`${BASE_URL}/auth/register`, userData, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
};

export const logout = async () => {
  return await axios.post(
    `${BASE_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }
  );
};
