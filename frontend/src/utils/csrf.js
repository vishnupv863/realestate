// utils/csrf.js
import axios from "axios";
import { BASE_URL } from "../config"; // ensure this points to http://127.0.0.1:8000 in dev

export const fetchCSRFToken = async () => {
  try {
    await axios.get(`${BASE_URL}/auth/csrf/`, {
      withCredentials: true,
    });
    // csrftoken is now set in cookies
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};
