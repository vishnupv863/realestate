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
  await fetchCSRFToken(); // Ensure CSRF token is fetched and cookie is set
  await new Promise((resolve) => setTimeout(resolve, 100)); // Optional: wait for cookie to be set

  // Debug logs
  console.log("All cookies:", document.cookie);
  console.log("CSRF token:", getCookie("csrftoken"));

  return await axios.post(
    `${BASE_URL}/auth/logout/`,
    {},
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }
  );
};
