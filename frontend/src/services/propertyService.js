import axios from "axios";
import { BASE_URL } from "../config";

export async function getProperties() {
  const response = await axios.get(`${BASE_URL}/properties/`);
  return response.data.properties;
}
