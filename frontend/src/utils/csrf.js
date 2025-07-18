// utils/csrf.js
import axios from "axios";
import { BASE_URL } from "../config"; // In dev: http://127.0.0.1:8000, In prod: https://your-backend.render.com

export const fetchCSRFToken = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/csrf/`, {
      withCredentials: true,
    });
    // Use token from response body
    const csrfToken = res.data.csrftoken;
    console.log("CSRF token fetched from response:", csrfToken);
    return csrfToken;
  } catch (error) {
    console.error(
      "Failed to fetch CSRF token:",
      error?.response || error.message
    );
    return null;
  }
};
