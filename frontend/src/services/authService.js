import axios from "axios";
import { BASE_URL } from "../config";
import { getCookie } from "../utils/cookies"; // ✅ Use this only

export const login = async (credentials) => {
  return await axios.post(`${BASE_URL}/auth/login`, credentials, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
};

export const register = async (userData) => {
  return await axios.post(`${BASE_URL}/auth/register/`, userData, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
  console.log("Registration successful", userData);
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
