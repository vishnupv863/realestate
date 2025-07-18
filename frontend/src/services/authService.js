import axios from "axios";
import { BASE_URL } from "../config";
import { getCookie } from "../utils/cookies"; // ✅ Use this only
import { fetchCSRFToken } from "../utils/csrf";

export const login = async (credentials) => {
  return await axios.post(`${BASE_URL}/auth/login/`, credentials, {
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
};

// Logout user and clear session
export const logout = async () => {
  const csrfToken = await fetchCSRFToken(); // Get token from response
  console.log("CSRF token being sent:", csrfToken);

  return await axios.post(
    `${BASE_URL}/auth/logout/`,
    {},
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );
};
