import axios from "axios";
import { BASE_URL } from "../config"; // assuming config.js exports VITE_API_URL

export const submitProperty = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/properties/submit-property/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Property submission failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
