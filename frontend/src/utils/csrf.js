// utils/csrf.js
import axios from "axios";
import { BASE_URL } from "../config"; // In dev: http://127.0.0.1:8000, In prod: https://your-backend.render.com

export const fetchCSRFToken = async () => {
  try {
    await axios.get(`${BASE_URL}/auth/csrf/`, {
      withCredentials: true,
    });
    // Now browser should store 'csrftoken' cookie automatically
    console.log("CSRF token fetched and cookie set.");
  } catch (error) {
    console.error(
      "Failed to fetch CSRF token:",
      error?.response || error.message
    );
  }
};
