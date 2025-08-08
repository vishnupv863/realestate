import axios from "axios";
import { BASE_URL } from "../config";
import { getCookie } from "../utils/cookies";

export const submitProperty = async (formData) => {
  console.log("Submitting property with data:", formData);
  try {
    const response = await axios.post(
      `${BASE_URL}/properties/submit-property/`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": getCookie("csrftoken"),
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
