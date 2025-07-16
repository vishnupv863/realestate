import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { getCookie } from "../utils/cookies";

const useSessionCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const csrfToken = getCookie("csrftoken");
      console.log("CSRF token being sent:", csrfToken); // ✅ LOG HERE

      try {
        const res = await axios.get(`${BASE_URL}/auth/me/`, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        });
        if (res.status === 200) {
          navigate("/properties");
        }
      } catch (err) {
        console.log("Session check failed:", err.response?.status);
      }
    };

    checkLogin();
  }, []);
};

export default useSessionCheck;
