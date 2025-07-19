import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { getCookie } from "../utils/cookies";

const useSessionCheck = (onFinish) => {
  const navigate = useNavigate();

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
        if (res.status === 200) {
          navigate("/properties");
        }
      } catch (err) {
        // Not logged in
      } finally {
        if (onFinish) onFinish();
      }
    };

    checkLogin();
  }, []);
};

export default useSessionCheck;
