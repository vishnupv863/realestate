import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { getCookie } from "../utils/cookies";

const useSessionCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const csrfToken = getCookie("csrftoken");
      try {
        const res = await axios.get(`${BASE_URL}/auth/me/`, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        });
        setIsAuthenticated(res.status === 200);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkLogin();
  }, []);

  return isAuthenticated;
};

export default useSessionCheck;
