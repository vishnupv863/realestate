import { useState } from "react";
import {
  login as loginAPI,
  register as registerAPI,
  logout as logoutAPI,
} from "../services/authService";

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAPI(credentials);
      setResponse(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register: registerAPI,
    logout: logoutAPI,
    error,
    loading,
    response,
  };
};
