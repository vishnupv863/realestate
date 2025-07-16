import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BASE_URL } from "../../config";
import { fetchCSRFToken } from "../../utils/csrf";
import { getCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // 1. Fetch CSRF cookie from Django
      await fetchCSRFToken();

      // 2. Get the CSRF token from cookie
      const csrfToken = getCookie("csrftoken");

      // 3. Send token to backend with CSRF header
      const res = await axios.post(
        `${BASE_URL}/auth/google-login/`,
        { token: credentialResponse.credential },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      console.log("Login success:", res.data);
      navigate("/properties"); // ✅ redirect to home
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
