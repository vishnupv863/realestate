// components/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout(); // Ends Django session
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        navigate("/"); // Redirect to home no matter what
      }
    };

    handleLogout();
  }, []);

  return <p>Logging out...</p>; // Optional message/spinner
}

export default Logout;
