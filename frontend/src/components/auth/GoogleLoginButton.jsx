import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BASE_URL } from "../../config";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/google-login/`, // Django endpoint
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      console.log("Login success:", res.data);
      // Redirect if needed
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
